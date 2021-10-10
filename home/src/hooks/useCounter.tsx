import { useState, useCallback } from 'react';

const useCounter = (initialVal = 0): [number, (newVal: number) => void] => {
    const [count, setCount] = useState(initialVal);
     
    const updateCount = useCallback((newVal: number) => {
        setCount(newVal)
    }, [setCount]);
     
    return [count, updateCount]
}

export default useCounter;