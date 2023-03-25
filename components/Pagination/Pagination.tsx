import React, {useState} from 'react'
import styles from './Pagination.module.css'
type Props = {
    npages: number,
    currentPage : number
    setCurrentPage: any
    children?: React.ReactNode

}

const Pagination : React.FC<Props>= ({npages, currentPage, setCurrentPage}) => {

    const [ selectPage , setSelectPage] = useState();
    const [pageNumberLimit , setPageNumberLimit] = useState(5);
    const [maxpageNumberLimit , setMaxPageNumberLimit] = useState(5);
    const [minpageNumberLimit , setMinPageNumberLimit] = useState(0);


    const pageNumbers = Array.from(Array(npages + 1).keys()).slice(1);

    const renderPage = pageNumbers.map((number , id)=> {
        if( number < maxpageNumberLimit + 1 && number >= minpageNumberLimit){
            return (
                <div key = {id}>
                <button className = { currentPage == number ? styles.active : styles.nav} onClick = {() => setCurrentPage(number)}>
                        {number}</button>
                </div>
            )
        }else {
            return null
        }
    }) 

    const isCurrentPageCloseToStart = currentPage <= 3;
    const isCurrentPageCloseToEnd = currentPage >= npages - 2;
    console.log(isCurrentPageCloseToStart , isCurrentPageCloseToEnd)

    const nextPage = () => {
            setCurrentPage(currentPage + 1)

            if(currentPage + 1 > maxpageNumberLimit){
                setMaxPageNumberLimit(maxpageNumberLimit + pageNumberLimit)
                setMinPageNumberLimit(minpageNumberLimit + pageNumberLimit)
            }
    }

    const prevPage = () => {
            setCurrentPage(currentPage - 1)
            if((currentPage - 1) % pageNumberLimit === 0){
                setMaxPageNumberLimit(maxpageNumberLimit - pageNumberLimit)
                setMinPageNumberLimit(minpageNumberLimit - pageNumberLimit)
            }
    }
    let pageIncrementBtn = null;
    if(pageNumbers.length > maxpageNumberLimit){
        pageIncrementBtn = <button className = {styles.nav} onClick = {nextPage}> &hellip; </button>
    }

    let pageDecrementBtn = null;
    if(pageNumbers.length >= 1 ){
        pageDecrementBtn = <button className = {styles.nav} onClick = {prevPage}> &hellip; </button>
    }
  return (
        <div className={styles.parent}>
        <button className={styles.nav}
        // disabled = {currentPage === pageNumbers[0] ? true:false}
        onClick={prevPage}>{'<<'}</button>
            
          {pageDecrementBtn}
          {renderPage}
          {pageIncrementBtn}

        { currentPage !== npages &&
               <button className={styles.nav} 
               disabled = {currentPage === pageNumbers[pageNumbers.length - 1]? true:false}
               onClick = {nextPage}> {'>>'} </button>
        }
     
        </div>

  )
}

export default Pagination