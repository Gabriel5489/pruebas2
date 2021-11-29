

import React, {useState, useEffect} from 'react'
import { ScrollView } from 'react-native';
import LoadingSearch from '../../componentes/LoadingSearch';
import NoFoundSearch from "./NoFoundSearch"
import { size } from "lodash"
import { advSearch } from '../../api/Search';
import ProductList from '../../componentes/Search/ProductList';
export default function AdvSearch(props) {
    const { route } = props;
    const { params } = route; 
    const [products, setProducts] = useState(null);
    useEffect(() => {
      (async () => {
          setProducts(null);
          const response = await advSearch(params);
          setProducts(response);
          console.log(response);   
      })() 
    }, [params])
    
    return (
        <>

            {!products ? (
                <LoadingSearch />
            ) : size(products)===0 ? (
                <NoFoundSearch prod={params.Search}/>
            ) :(
                <ScrollView>
                    <ProductList products={products} />
                </ScrollView>
            )}

        </>
    )
}
