import { Text, Dialog, Button, Flex, TextField, Strong } from "@radix-ui/themes";
import { patchCategory } from "@/services/category.service";
import { useState } from "react";


type DialogCategoryProps = {
    getCategoriesData: Function;
    id: string;
    category_name: string;
};

const DialogEdit = ({ getCategoriesData, id, category_name }: DialogCategoryProps) => {
    const [patchCategoryName, setPatchCategoryName] = useState("");

    const handleUpdateCategory = async () => {
        if (!patchCategoryName) {
            alert("Please enter a category name.");
            return;
        }
        patchCategory({
            id: id,
            category_name: patchCategoryName
        })
            .then((response)=>{
                if (response.statusCode === 200) {
                    setPatchCategoryName("");
                    getCategoriesData();
                } else if (response.statusCode === 400) {
                    alert(response.message);
                } else {
                    alert(`Unexpected error: ${response.message}`);
                }
            })
            
                
            .catch((error)=> {
                console.error("Error updating category:", error.response?.data || error.message);
                alert("Failed to update category. Please try again.");
            });
    };

    return(
        <>
        <Dialog.Root>
            <Dialog.Trigger>
                <Button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Edit</Button>
            </Dialog.Trigger>
            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Edit Category</Dialog.Title>

                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            <Strong>Id:</Strong>{id}</Text>
                        
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            <Strong>Before Category Name:</Strong>{category_name}
                        </Text>
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            New Category Name
                        </Text>
                        <TextField.Root
                            placeholder="Enter your category name"
                            onChange={(event) => setPatchCategoryName(event.target.value)}
                        />
                    </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button onClick={handleUpdateCategory}>Save</Button>
                    </Dialog.Close>
                </Flex>
                </Dialog.Content>
        </Dialog.Root>
        </>
    )

    
    
};

export default DialogEdit;
