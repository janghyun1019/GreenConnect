import { useState } from "react";

function Likes() {
    const [JjimItems, setJjimItems] =useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

        useEffect(() => {
            fetchCartItems();
            fetchTransactions();
        }, []);
        
    return(
        
    )
}
export default Likes;