"use client"

import SelectService from "@/components/SelectService";
import { useEffect, useState } from "react"

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <>
          <SelectService />
        </>
    )
}

export default ModalProvider;