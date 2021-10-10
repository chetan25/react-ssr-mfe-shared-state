import React, { useEffect, useRef } from "react";

const useClickOutside = <T extends HTMLElement>(
    elRef: React.RefObject<T> | null,
    cb: (event: Event) => void
) => {
    const cbRef = useRef<(event: Event) => void>();
    cbRef.current = cb;

    useEffect(() => {
    console.log('hookfired');
    const handleClickOutside = (event: Event) => {
       if (elRef && !elRef.current?.contains(event.target as HTMLElement) && cbRef.current) {
          cbRef.current(event);
       }
    }
    document.addEventListener('click', handleClickOutside, true);

    return () => {
        document.removeEventListener('click', handleClickOutside, true);
    }
  }, [cbRef, elRef]);


}

export default useClickOutside;