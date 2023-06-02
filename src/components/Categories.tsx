import { Tab, TabList } from "@chakra-ui/react";
import { CATEGORIES } from "../constants";

const Categories: React.FC<{setCategory: React.Dispatch<React.SetStateAction<string>>}> = ({setCategory}) => (
    <TabList>
        {' '}
        {CATEGORIES.map((category) => (
            <Tab
                key={category.path}
                onClick={() => setCategory(category.path)}
                fontSize="xs"
            >
                {category.name}
            </Tab>
        ))}
        {' '}
    </TabList>
);

export default Categories;