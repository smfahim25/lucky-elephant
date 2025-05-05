"use client";
import { useState } from 'react';

// Improved styles for better form appearance
const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  label: {
    marginBottom: '10px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    marginBottom: '20px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    backgroundColor: '#f9f9f9',
  },
  textarea: {
    marginBottom: '20px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    height: '150px',
    backgroundColor: '#f9f9f9',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  sectionContainer: {
    marginBottom: '30px',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
  },
};

export default function CreatePost() {
  const [post, setPost] = useState({
    title: '',
    slug: '',
    excerpt: '',
    thumbnail_url: '',
    author_avatar: '',
    categories: [],
    tags: [],
    sections: [{ title: '', content: '', image_url: '' }],
    author: 'INNA MOUAZ',
  });

  const addSection = () => {
    setPost({
      ...post,
      sections: [...post.sections, { title: '', content: '', image_url: '' }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/blog/addPost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });

      if (!res.ok) throw new Error('Failed to submit post');
      alert('Post submitted successfully!');
    } catch (error) {
      console.error('Error submitting post:', error);
      alert('Error submitting post');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <label style={styles.label}>Title:</label>
      <input
        type="text"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        style={styles.input}
        placeholder="Enter the blog title"
      />

      <label style={styles.label}>Slug:</label>
      <input
        type="text"
        value={post.slug}
        onChange={(e) => setPost({ ...post, slug: e.target.value })}
        style={styles.input}
        placeholder="Enter the URL slug (e.g., my-first-blog)"
      />

      <label style={styles.label}>Excerpt:</label>
      <input
        type="text"
        value={post.excerpt}
        onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
        style={styles.input}
        placeholder="Short description of the post"
      />

      <label style={styles.label}>Thumbnail URL:</label>
      <input
        type="text"
        value={post.thumbnail_url}
        onChange={(e) => setPost({ ...post, thumbnail_url: e.target.value })}
        style={styles.input}
        placeholder="URL of the blog thumbnail image"
      />

      <label style={styles.label}>Author Avatar URL:</label>
      <input
        type="text"
        value={post.author_avatar}
        onChange={(e) =>
          setPost({ ...post, author_avatar: e.target.value })
        }
        style={styles.input}
        placeholder="Enter the author avatar URL"
      />

      <label style={styles.label}>Categories:</label>
      <input
        type="text"
        value={post.categories.join(', ')}
        onChange={(e) =>
          setPost({ ...post, categories: e.target.value.split(', ') })
        }
        style={styles.input}
        placeholder="Enter categories separated by commas"
      />

      <label style={styles.label}>Tags:</label>
      <input
        type="text"
        value={post.tags.join(', ')}
        onChange={(e) =>
          setPost({ ...post, tags: e.target.value.split(', ') })
        }
        style={styles.input}
        placeholder="Enter tags separated by commas"
      />

      <label style={styles.label}>Content Sections:</label>
      {post.sections.map((section, index) => (
        <div key={index} style={styles.sectionContainer}>
          <input
            type="text"
            value={section.title}
            onChange={(e) => {
              const newSections = [...post.sections];
              newSections[index].title = e.target.value;
              setPost({ ...post, sections: newSections });
            }}
            style={styles.input}
            placeholder="Enter section title"
          />
          <textarea
            value={section.content}
            onChange={(e) => {
              const newSections = [...post.sections];
              newSections[index].content = e.target.value;
              setPost({ ...post, sections: newSections });
            }}
            style={styles.textarea}
            placeholder="Enter section content"
          />
          <input
            type="text"
            value={section.image_url}
            onChange={(e) => {
              const newSections = [...post.sections];
              newSections[index].image_url = e.target.value;
              setPost({ ...post, sections: newSections });
            }}
            style={styles.input}
            placeholder="Enter image URL for this section (optional)"
          />
        </div>
      ))}

      <button type="button" onClick={addSection} style={styles.button}>
        Add Section
      </button>

      <button type="submit" style={styles.button}>
        Submit Post
      </button>
    </form>
  );
}
