import React, { useState } from 'react'

const UseFetch = (cb, options ={}) => {
    const [data,setData] =useState(null)
    const [loading,setLoading] =useState(null)
    const [error,setError] =useState(null)

    const check= async(...args) => {
        setLoading(true)
        setError(null)
        try {
            const response = await cb(options,...args)
            setData(response)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

  return {data, loading, error,check}
}

export default UseFetch