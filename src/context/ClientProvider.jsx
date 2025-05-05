'use client'

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

import { ToastContainer, toast } from 'react-toastify'
import { useGlobalStates } from '../store/useGlobalStates';
import { useEffect } from 'react';

const queryClient = new QueryClient()


export default function ClientProvider({ children }) {
const {address, chainId} = useGlobalStates((state) => state.contract);
useEffect(()=>{
  if(address){
    if(chainId !== 1){
      toast.error('Please change your chain Ethereum Mainnet')
    }
  }
},[address, chainId])
  return (
    <div>
       <ToastContainer
          position='bottom-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='dark'
        />
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
    </div>
  )
}
