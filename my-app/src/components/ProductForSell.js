import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { List, Typography, Button } from 'antd';

const { Title } = Typography;

const Productforsell = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('خطأ في جلب المنتجات', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSell = (productId, product) => {
    console.log("Product ID in handleSell:", productId); 
    navigate(`/mainlayout/sellproduct/${productId}`, { state: { productId, productName: product.name } }); 
  };

  return (
    <div style={{ padding: '20px', direction: 'rtl' }}>
      <Title level={2}>قائمة المنتجات</Title>
      <List
        itemLayout="horizontal"
        dataSource={products}
        renderItem={product => (
          <List.Item
            actions={[
              <Button type="primary" onClick={() => handleSell(product._id, product)}>بيع</Button>
            ]}
          >
            <List.Item.Meta
              title={product.name}
              description={`الكمية: ${product.quantity}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Productforsell;
