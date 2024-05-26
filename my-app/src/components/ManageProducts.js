import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Typography, Popconfirm, message } from 'antd';

const { Title } = Typography;

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
        message.error('خطأ في جلب المنتجات');
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`/api/products/${productId}`);
      setProducts(products.filter(product => product._id !== productId));
      message.success('تم حذف المنتج بنجاح');
    } catch (error) {
      console.error('Error deleting product', error);
      message.error('خطأ في حذف المنتج');
    }
  };

  const handleEdit = (product) => {
    navigate('/mainlayout/addproduct', { state: { product } });
  };

  const columns = [
    {
      title: 'اسم المنتج',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'الكمية',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'الإجراءات',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => handleEdit(record)}>
            تعديل
          </Button>
          <Popconfirm
            title="هل أنت متأكد من حذف هذا المنتج؟"
            onConfirm={() => handleDelete(record._id)}
            okText="نعم"
            cancelText="لا"
          >
            <Button type="danger" style={{ marginLeft: 8 }}>
              حذف
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px', direction: 'rtl' }}>
      <Title level={2}>إدارة المنتجات</Title>
      <Table dataSource={products} columns={columns} rowKey="_id" />
    </div>
  );
};

export default ManageProducts;
