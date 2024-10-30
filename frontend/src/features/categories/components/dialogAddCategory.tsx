import { postCategory } from "@/services/category.service";
import { useState } from 'react';
import { Dialog, Button, Text,TextField, Flex} from "@radix-ui/themes";

type DialogCategoryProps ={
    getCategoriesData: Function;
}
const DialogAdd = ({getCategoriesData}:DialogCategoryProps)=>{
    const [postCategoryName, setPostCategoryName] = useState("")
    const handleCreateCategory = async () =>{
        if(!postCategoryName){
            alert("please enter a category name.");
            return;
        }
        postCategory({category_name: postCategoryName})
            .then((Response)=>{
                if(Response.statusCode === 200){
                    setPostCategoryName("")
                    getCategoriesData();
                }
            })
            .catch((error)=>{
                alert("Failed to create category."+error);
            })
    }
    return(
        <>
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button size="1">Create</Button>
                </Dialog.Trigger>

                <Dialog.Content maxWidth="450px">
                    <Dialog.Title>Create Category</Dialog.Title>

                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Category Name
                            </Text>
                            <TextField.Root
                                placeholder="Enter your category name"
                                onChange={(event) => setPostCategoryName(event.target.value)}
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
                            <Button onClick={handleCreateCategory}>Save</Button>
                        </Dialog.Close>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
        </>
    )
}
export default DialogAdd