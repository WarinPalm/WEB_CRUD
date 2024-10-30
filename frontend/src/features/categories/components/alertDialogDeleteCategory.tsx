import { AlertDialog, Dialog, Button, Flex, TextField, Strong } from "@radix-ui/themes";
import { deleteCategory } from "@/services/category.service";
import { useState } from "react";

type DialogCategoryProps = {
    getCategoriesData: Function;
    id: string;
    category_name: string;
};

const AlertDialogDelete = ({ getCategoriesData, id, category_name }: DialogCategoryProps) => {

    const handleDeleteCategory = async () =>{
        try{
            const resDeleteCategory = await deleteCategory({
                id: id
            })
            getCategoriesData();
        }catch(error){
            console.error("Error Delete Category", error)
        }
    };
    return(
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button className="bg-red-500 text-white p-2 rounded hover:bg-red-600">Delete</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Delete Category</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    <Strong>Category Name : </Strong>{category_name}
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button variant="solid" color="red" onClick={handleDeleteCategory}>
                            Delete
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>

    )
}
export default AlertDialogDelete;