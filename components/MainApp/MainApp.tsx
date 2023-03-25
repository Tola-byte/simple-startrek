import React , {useCallback, useEffect , useState} from 'react'
import styles from './MainApp.module.css'
import axios from 'axios'
import Pagination from '../Pagination/Pagination'
type Props = {}


type SpaceCraftType = {
dateStatus: string;
name: string;
operator: null | string;
owner: null | string;
registry: string;
spacecraftClass: {uid: string, name: string} | null
status: string | null
uid: string;
}

type ResponseType = {
    page : {
        totalPages: number;
    },
    spacecrafts: SpaceCraftType[];
}

const MainApp = (props: Props) => {
     const [response , setResponse] = useState<ResponseType|null>(null)
     const [searchResponse , setSearchResponse] = useState<ResponseType|null>(null)
    const [searchTerm, setSearchTerm] = useState<string>("")

    // create state for user currently on a page

    const [currentPage, setCurrentPage] = useState(0);
    // No of Records to be displayed on each page   
    


    
    useEffect(() => {
        const fetchData = async() => {
             if(searchTerm) return;
           try{
               const dataFromAPI = await axios.get(`https://stapi.co/api/v1/rest/spacecraft/search?pageNumber=${currentPage}`)
               const useableData = dataFromAPI.data
               setResponse(useableData)
           }
           catch(err) {
               console.log(err)
           }
       }
       fetchData(); 
   }, [currentPage, searchTerm])
   
   const searchPages = async (searchTerm: string) => {
    try {
      const searchResult = await axios.post(`https://stapi.co/api/v1/rest/spacecraft/search`,   {
      name: searchTerm
      }, 
      {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      } , 
      )
      setResponse(searchResult.data)
      return (searchResult.data.spacecrafts)
      
    } catch (error) {
      console.error(error);
      return error;
    }
  };
    
    const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm((e.target as HTMLInputElement).value)
    }
    const nPages = response?.page.totalPages || 0;
  return (
    <div>

        <h1 className = {styles.heading}> My StarTrek SpaceCraft</h1>
      
      <div className={styles.search}>
        <input className={styles.input} type="text" value={searchTerm} onChange = {searchHandler} placeholder='Search for your favorite spacecraft here' />
        <button onClick={()=> searchPages(searchTerm)}>Search</button>
      </div>

    <div className={styles.contents}>

       { 
     

       response?.spacecrafts 
       ?.map((details , id) => {
        return (
            <div key={details.uid} className = {styles.card}>
                <div className = {styles.texts}> 
                
                  <div className={styles.details}>
                  name : { details.name }
                  </div>

                  <div className={styles.details}>
                  registry : {details.registry === null ? "unknown" : details.registry}
                  </div>
                  <div className={styles.details}>
                  status: {details.status === null ? "unknown" : details.status}
                  </div>
                  <div className={styles.details}>
                  dateStatus: {details.dateStatus === null ? "unknown" : details.dateStatus}
                  </div>

                  <div className={styles.details}>
                  spacecraft:    {details.spacecraftClass?.name === null || undefined ? "unknown" : details.spacecraftClass?.name}
                  </div>
                  <div className={styles.details}>          
                  uuid: {details.spacecraftClass?.uid === null || undefined ? "unknown" : details.spacecraftClass?.uid}
                  </div>
                 
                </div>
            </div>
            
        )
        
      })
    }
     
    
      </div>

      <div className={styles.pagination}>
        <Pagination 
        npages= {nPages}
        currentPage = { currentPage } 
        setCurrentPage = { setCurrentPage }
        />
      </div>
    </div>
  )
    }

export default MainApp
    