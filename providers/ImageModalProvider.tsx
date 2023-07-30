"use client"

import ImageModal from "@/components/ImageModal";
import { useEffect, useState } from "react"

const ImageModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <>
          <ImageModal />
        </>
    )
}

export default ImageModalProvider;