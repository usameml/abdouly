import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Typography, Popconfirm, message, Form, Input, Modal } from 'antd';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../assets/logo.png'; // Logonuzun yolunu buraya ekleyin

const { Title } = Typography;

const ManageSales = () => {
  const [sales, setSales] = useState([]);
  const [editingSale, setEditingSale] = useState(null);
  const [form] = Form.useForm();

  const companyInfo = {
    name: "Boutique Ehle Abdouly - BEA",
    address: "Caraffour Mosquee Maroc",
    phone: "27235533 - 38228289",
  };


  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get('/api/sales');
        setSales(response.data);
      } catch (error) {
        console.error('Error fetching sales', error);
        message.error('خطأ في جلب المبيعات');
      }
    };

    fetchSales();
  }, []);

  const handleDelete = async (saleId) => {
    try {
      await axios.delete(`/api/sales/${saleId}`);
      setSales(sales.filter((sale) => sale._id !== saleId));
      message.success('تم حذف البيع بنجاح');
    } catch (error) {
      console.error('Error deleting sale', error);
      message.error('خطأ في حذف البيع');
    }
  };

  const handleEdit = (sale) => {
    setEditingSale(sale);
    form.setFieldsValue(sale);
  };

  const handleSave = async (values) => {
    if (editingSale && editingSale._id) {
      try {
        const response = await axios.put(`/api/sales/${editingSale._id}`, values);
        setSales(sales.map((sale) => (sale._id === editingSale._id ? { ...sale, ...values } : sale)));
        setEditingSale(null);
        message.success('تم تعديل البيع بنجاح');

        // PDF oluşturma ve indirme
        const doc = new jsPDF();

        // Logo ve şirket bilgilerini ekleme
        doc.addImage(logo, 'PNG', 10, 10, 50, 30); // Logoyu ekle
        doc.setFontSize(12);
        doc.text(companyInfo.name, 70, 15);
        doc.text(companyInfo.address, 70, 22);
        doc.text(companyInfo.phone, 70, 29);

        // Satış bilgileri
        doc.autoTable({
          startY: 60,
          head: [['Product ID', 'Product Name', 'Price', 'Size', 'Weight', 'Quantity Sold', 'Customer Name', 'Paid Amount', 'Remaining Amount']],
          body: [[
            editingSale._id,
            values.productName,
            values.price,
            values.size,
            values.weight,
            values.quantitySold,
            values.customerName,
            values.paidAmount,
            values.remainingAmount,
          ]]
        });

        const finalY = doc.autoTable.previous.finalY + 20;
        doc.text('Manager Signature:', 10, finalY);
        doc.line(50, finalY, 150, finalY); // Signature line

        doc.save('invoice.pdf');
      } catch (error) {
        console.error('Error editing sale', error);
        if (error.response && error.response.data) {
          message.error('خطأ في تعديل البيع: ' + error.response.data);
        } else {
          message.error('خطأ في تعديل البيع');
        }
      }
    } else {
      message.error('معرف البيع مفقود أو غير صحيح');
    }
  };

  const handleCancel = () => {
    setEditingSale(null);
    form.resetFields();
  };

  const columns = [
    {
      title: 'اسم العميل',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'اسم المنتج',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'السعر',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'الحجم',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'الوزن',
      dataIndex: 'weight',
      key: 'weight',
    },
    {
      title: 'الكمية المباعة',
      dataIndex: 'quantitySold',
      key: 'quantitySold',
    },
    {
      title: 'المبلغ المدفوع',
      dataIndex: 'paidAmount',
      key: 'paidAmount',
    },
    {
      title: 'المبلغ المتبقي',
      dataIndex: 'remainingAmount',
      key: 'remainingAmount',
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
            title="هل أنت متأكد من حذف هذا البيع؟"
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
      <Title level={2}>إدارة المبيعات</Title>
      <Table dataSource={sales} columns={columns} rowKey="_id" />
      <Modal
        open={!!editingSale}
        title="تعديل البيع"
        okText="حفظ"
        cancelText="إلغاء"
        onCancel={handleCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              handleSave(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
        >
          <Form.Item
            name="customerName"
            label="اسم العميل"
            rules={[{ required: true, message: 'الرجاء إدخال اسم العميل' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="productName"
            label="اسم المنتج"
            rules={[{ required: true, message: 'الرجاء إدخال اسم المنتج' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="السعر"
            rules={[{ required: true, message: 'الرجاء إدخال السعر' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="size"
            label="الحجم"
            rules={[{ required: true, message: 'الرجاء إدخال الحجم' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="weight"
            label="الوزن"
            rules={[{ required: true, message: 'الرجاء إدخال الوزن' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="quantitySold"
            label="الكمية المباعة"
            rules={[{ required: true, message: 'الرجاء إدخال الكمية المباعة' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="paidAmount"
            label="المبلغ المدفوع"
            rules={[{ required: true, message: 'الرجاء إدخال المبلغ المدفوع' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="remainingAmount"
            label="المبلغ المتبقي"
            rules={[{ required: true, message: 'الرجاء إدخال المبلغ المتبقي' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageSales;
