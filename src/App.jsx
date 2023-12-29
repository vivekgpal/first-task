
import { useEffect,useState } from "react"
import "./App.css"
function App() {


  const [products, setProducts] = useState([]);

  useEffect(()=>{

    const fetchData = async ()=>{
      try{
        const res = await fetch('https://s3.amazonaws.com/open-to-cors/assignment.json');
        const jsonData = await res.json();

        const productsArray = Object.entries(jsonData.products).map(([productId, productDetails]) => ({
          id: productId, 
          ...productDetails 
        }));
      
     
        const sortedProducts = productsArray.sort((a, b) => b.popularity - a.popularity);
        setProducts(sortedProducts);
       
        

      }catch(err){
        console.log('Error fetching data:',err);
      }
      
    }
    fetchData();
   
  
  },[])
  
  
  return (
    <>
       {products.length > 0 ? (
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Subcategory</th>
              <th>Price</th>
              <th>Popularity</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.subcategory}</td>
                <td>{product.price}</td>
                <td>{product.popularity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "Loading..."
      )}
    </>
  )
}

export default App
