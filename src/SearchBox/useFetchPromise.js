import { useCallback, useEffect, useState } from "react"

const useFetchPromise = (query,transformData,promise,debounceWait,autoComplete ) => {

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    const debounce = (mainFn, debounceWait) => {

        let timerFlag = null;
        return (...args) => {
            clearInterval(timerFlag)
            timerFlag = setTimeout(()=> {
                mainFn(...args)
            }, debounceWait)
        }
    }

    const fetchData = useCallback(debounce(async (query, transformData, signal ) => {

        try {

            const res = await promise(query, signal);
            if(!res.ok){
                throw new Error(res.statusText)
            }

            const resData = await res.json()
            setData(transformData(resData))
          
            
        } catch (error) {
            console.log(error);
            if(!signal.aborted) {
                setError(error)
            }
           
        }
    }, debounceWait), [])

    useEffect(() => {
        if(!query || !autoComplete) {
            setData(null)
            setError(null)
            return;
        }

        const controller = new AbortController();
        const signal = controller.signal
        fetchData(query,transformData, signal )

        return () => {
            controller.abort()
        }
    }, [query, transformData, fetchData ])

    return [data, setData, error]
}

export default useFetchPromise;