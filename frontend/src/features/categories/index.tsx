import { useEffect, useState } from "react";
import { Table } from "@radix-ui/themes";
import { getCategories } from "@/services/category.service";
import { TypeCategoriesAll } from "@/types/response/response.category";
import DialogAdd from "./components/dialogAddCategory";
import DialogEdit from "./components/dialogEditCategory";
import AlertDialogDelete from "./components/alertDialogDeleteCategory";

export default function CategoriesFeature() {
  const [categories, setCategories] = useState<TypeCategoriesAll[]>([]);

  const getCategoriesData = () => {
    getCategories().then((res) => {
      console.log(res);
      setCategories(res.responseObject);
    });
  };

  useEffect(() => {
    getCategoriesData();
  }, []);

  return (
    <div className="bg-[url('./banner1.jpg')] bg-cover bg-center min-h-screen"> 
      <div className="container mx-auto p-4">
        
        <div className="bg-white shadow-lg rounded-lg mt-5 bg-opacity-90">
          <div className="flex justify-between p-6 py-4 border-b">
            <h1 className="text-2xl font-bold">Categories</h1>
            <DialogAdd getCategoriesData={getCategoriesData} /> 
          </div>

          <Table.Root className="w-full">
            <Table.Header className="bg-gray-300">
              <Table.Row>
                <Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Category Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Edit</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Delete</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {categories &&
                categories.map((category: TypeCategoriesAll) => (
                  <Table.Row key={category.id}>
                    <Table.RowHeaderCell>{category.id}</Table.RowHeaderCell>
                    <Table.Cell>{category.category_name}</Table.Cell>
                    <Table.Cell>
                      <DialogEdit getCategoriesData={getCategoriesData}  id={category.id} category_name={category.category_name}/>
                    </Table.Cell>
                    <Table.Cell>
                      <AlertDialogDelete getCategoriesData={getCategoriesData}  id={category.id} category_name={category.category_name}/>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table.Root>
        </div>
      </div>
    </div>
  );
}
