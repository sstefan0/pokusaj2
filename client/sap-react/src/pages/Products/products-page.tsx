import { useEffect, useState } from "react";
import agent from "../../api/agent";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./product-style.css";

interface Product {
  name: string;
  imageData: string;
  description: string;
}


export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    agent.Products.getAllProducts()
      .then((items: Product[]) => {
        setProducts(items);
        console.log(items);
      })
      .catch((error: Error) => console.log(error));
  }, []);
  return (
    <div className="cardsContainer">
    {products.map((item: Product) =>(
      <Card sx={{ maxWidth: 345, minWidth: 210 }}>
      <CardMedia
        component="img"
        alt="product image"
        height="140"
        image={item.imageData}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
   ) )}
   </div>
  );
}