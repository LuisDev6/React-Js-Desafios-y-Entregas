import React, { useEffect, useState } from 'react'
import ItemDetail from '../../components/ItemDetail';
import "./style.css"
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase/config';



//obtener los datos de un producto especifico
const ItemDetailContainer = () => {

    const [productDetail, setProductDetail] = useState({});

    const params = useParams()


    useEffect(() => {
        const getProductos = async () => {
            try {
                const docRef = doc(db, "products", params.productId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    const productDetail = {id: docSnap.id, ...docSnap.data()}
                    setProductDetail(productDetail)
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
/*                 const response = await fetch('/mocks/data.json');
                const data = await response.json();
                const result = data.find(data => data.id === parseInt(params.productId));
                setProductDetail(result); */
            } catch (error) {
                console.log(error);
            }
        }
        getProductos();
    }, [params]);

    return (

        Object.keys(productDetail).length !== 0 ?

            <ItemDetail className="item-detail" product={productDetail} />
            :
            <p>Loading...</p>
    )
}


export default ItemDetailContainer
