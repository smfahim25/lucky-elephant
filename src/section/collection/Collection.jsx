import { useEffect, useState } from 'react';
import FilterBox from './filterBox/FilterBox';
import Product from './product/Product';
import Pagination from '../../common/pagination/Pagination';
import MetadataModal from './MetadataModal';
import CollectionStyleWrapper from './Collection.style';

const Collection = () => {
  const [nfts, setNfts] = useState([]);
  const [filteredNfts, setFilteredNfts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const NFTsPerPage = 100;
  const totalNFTSupply = 537;
  const totalPages = Math.ceil(totalNFTSupply / NFTsPerPage);

  const [selectedNFT, setSelectedNFT] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});

  const collectionAddress = '0x42de23cc51A8425C248C9801395DD47BD1996152';

  // ✅ Ensure IPFS URLs are correctly formatted
  const getIpfsUrl = (url) => {
    if (!url) return '/assets/images/Jungleverse.gif';
    if (url.startsWith('ipfs://')) {
      return url.replace('ipfs://', 'https://ipfs.io/ipfs/');
    }
    if (url.startsWith("https://nftstorage.link/ipfs/")) {
      return url.replace("https://nftstorage.link/ipfs/", "https://ipfs.io/ipfs/");
    }
    return url;
  };

  // ✅ Fetch NFTs including metadata and owner wallet address
  const fetchNFTs = async (newCursor = null, pageNumber = 1) => {
    setLoading(true);
    setIsFetching(true);

    try {
      const response = await fetch(`/api/collection?address=${collectionAddress}&limit=${NFTsPerPage}&cursor=${newCursor}`);

      if (!response.ok) {
        throw new Error('Failed to fetch NFTs from collection');
      }

      const data = await response.json();

      const updatedNFTs = await Promise.all(
        data.nfts.map(async (nft) => {
          let owner = nft.owner || "0x0000...0000"; // Default if owner is missing
          const formattedImage = getIpfsUrl(nft.metadata?.image);

          // ✅ Replace price with ENS name or wallet address
          let displayOwner = owner.includes('.eth') ? owner : `${owner.slice(0, 6)}...${owner.slice(-4)}`;

          return {
            ...nft,
            metadata: {
              name: nft.metadata?.name || `LEC Jungleverse #${nft.tokenId}`,
              image: formattedImage,
              attributes: nft.metadata?.attributes || [],
            },
            displayOwner, // Store formatted owner for display
          };
        })
      );

      setNfts(updatedNFTs);
      setFilteredNfts(updatedNFTs);
      setCursor(data.cursor);
      setHasMore(Boolean(data.cursor));
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    }

    setLoading(false);
    setIsFetching(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchNFTs(cursor, pageNumber);
  };

  const handleViewDetails = (nft) => {
    setSelectedNFT(nft);
    setIsModalOpen(true);
  };

  const handleFilterChange = (category, selectedFilters) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [category]: selectedFilters,
    }));
  };

  useEffect(() => {
    let filtered = nfts;

    Object.keys(activeFilters).forEach((category) => {
      if (activeFilters[category]?.length > 0) {
        filtered = filtered.filter((nft) =>
          activeFilters[category].includes(nft.metadata?.attributes?.find(attr => attr.trait_type === category)?.value)
        );
      }
    });

    setFilteredNfts(filtered);
  }, [activeFilters, nfts]);

  useEffect(() => {
    fetchNFTs(cursor, currentPage);
  }, [currentPage]);

  const traitCategories = [
    "Accessories",
    "Background",
    "Breed",
    "Clothes",
    "Ear Accessories",
    "Eyes",
    "Eyewear",
    "Face Accessories",
    "Headwear",
    "Jewelry",
    "Lucky Abilities",
    "Mouth",
    "Tattoos",
    "Tusks"
  ];

  // ✅ Fix: Define the missing getUniqueTraits function & prevent undefined categories
  const getUniqueTraits = (nfts, traitType) => {
    if (!nfts || !Array.isArray(nfts)) return [];

    const uniqueTraits = [];
    const traitMap = {};

    nfts.forEach((nft) => {
      const attributes = nft.metadata?.attributes || [];
      if (!attributes.length) {
        console.warn(`⚠️ NFT #${nft.tokenId} is missing attributes!`);
      }

      attributes.forEach((trait) => {
        if (trait.trait_type === traitType) {
          const traitValue = trait.value;
          if (traitValue && !traitMap[traitValue]) {
            uniqueTraits.push({
              title: traitValue,
              products: nfts.filter(n =>
                n.metadata?.attributes?.some(attr => attr.trait_type === traitType && attr.value === traitValue)
              ).length,
            });
            traitMap[traitValue] = true;
          }
        }
      });
    });

    return uniqueTraits;
  };

  return (
    <CollectionStyleWrapper>
      <div className="container">
        <div className="row filters_row">
          <div className="col-lg-3 col-md-4">
            <div className="filter_box_wrapper price_filter">
              <select name="PriceFilter" onChange={() => setNfts([])}>
                <option value="LowHigh">Price: Low to High</option>
                <option value="HighLow">Price: High to Low</option>
                <option value="recentlyListed">Recently Listed</option>
              </select>
            </div>

            {traitCategories.map((category, idx) => {
              const uniqueTraits = getUniqueTraits(nfts, category) || [];
              return (
                <FilterBox
                  key={idx}
                  category={{ widgetTitle: category || "Unknown", items: uniqueTraits }}
                  handleFilterChange={handleFilterChange}
                />
              );
            })}
          </div>

          <div className="col-lg-9 col-md-8">
            <div className="collection_items">
              <div className="row products_row">
                {filteredNfts.map((nft, idx) => (
                  <div key={idx} className="col-lg-4 col-sm-6 col-12">
                    <Product
                      thumb={{ src: getIpfsUrl(nft.metadata?.image) }}
                      title={nft.metadata?.name || `NFT #${nft.tokenId}`}
                      owner={nft.displayOwner} // ✅ Show wallet address or ENS
                      tokenId={nft.tokenId}
                      contractAddress={collectionAddress}
                      likes={Math.floor(Math.random() * 100)}
                      onViewDetails={() => handleViewDetails(nft)}
                    />
                  </div>
                ))}
              </div>

              {loading && <p>Loading NFTs...</p>}
              {!hasMore && <p>No more NFTs to load</p>}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>

        <MetadataModal nft={selectedNFT} isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />
      </div>
    </CollectionStyleWrapper>
  );
};

export default Collection;


