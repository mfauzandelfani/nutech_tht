/* eslint-disable array-callback-return */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import api from "../api/products";
export default function index() {
  let dummy = [
    {
      name: "Odol Gigi",
      Beli: 12000,
      Jual: 15000,
      stock: 50,
      id: 1,
    },
    {
      name: "Boneka",
      Beli: 10000,
      Jual: 20000,
      stock: 30,
      id: 2,
    },
    {
      name: "Jam Tangan",
      Beli: 100000,
      Jual: 250000,
      stock: 25,
      id: 3,
    },
    {
      name: "Sepatu",
      Beli: 50000,
      Jual: 75000,
      stock: 45,
      id: 4,
    },
    {
      name: "baju",
      Beli: 30000,
      Jual: 50000,
      stock: 80,
      id: 5,
    },

    {
      name: "Celana Jeans",
      Beli: 150000,
      Jual: 250000,
      stock: 7,
      id: 6,
    },
  ];

  const [data, setData] = useState(dummy);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [idDel, setIdDel] = useState(null);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },

    name: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    Beli: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    Jual: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    stock: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },

    id: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
  });

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Products</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  const handleAdd = () => {
    let dataThatWillAdded = {
      name,
      id: 6,
    };

    setData([...data, dataThatWillAdded]);
    setName("");
  };

  const handleButton = (v) => {
    return (
      <>
        <Button label="Edit" size="small" severity="primary" rounded />
        <Button
          label="Delete"
          size="small"
          severity="danger"
          rounded
          onClick={() => {
            setIdDel(v.id);
          }}
        />
      </>
    );
  };

  const Add = (
    <div className="card flex justify-content-center">
      <Button
        label="Add+"
        severity="success"
        onClick={() => setVisible(true)}
      />
      <Dialog
        isOpen={modalAdd}
        header="Tambah"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <form>
          <InputText
            type="text"
            className="p-inputtext-sm"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button onClick={() => handleAdd()}> Add</Button>
        </form>
      </Dialog>
    </div>
  );

  const handleDel = () => {
    let dataTmp = data.filter((v) => v.id !== idDel);
    setData(dataTmp);
    setModalDel(false);
  };

  useEffect(() => {}, [data]);

  return (
    <div className="card">
      <DataTable
        value={data}
        paginator
        rows={5}
        filters={filters}
        header={header}
        globalFilterFields={["id", "name", "Beli", "Jual", "stock"]}
        stripedRows
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="id" header="ID"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="Beli" header="Harga Beli"></Column>
        <Column field="Jual" header="Harga Jual"></Column>
        <Column field="stock" header="Stock"></Column>
        <Column body={handleButton} header={Add}></Column>
      </DataTable>
    </div>
  );
}
