import React, {useState, useEffect} from 'react'
import { ScrollView } from 'react-native';
import LoadingSearch from '../../componentes/LoadingSearch';
import NoFoundSearch from "./NoFoundSearch"
import { size } from "lodash"
import { searchProductsApi } from '../../api/Search';
import ProductList from '../../componentes/Search/ProductList';
export default function SearchProducts(props) {
    const { route } = props;
    const { params } = route; 
    const [products, setProducts] = useState(null);
    useEffect(() => {
      (async () => {
          setProducts(null);
          const response = await searchProductsApi(params.Search);
          setProducts(response);
          console.log(response);   
      })() 
    }, [params.Search])
    
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
