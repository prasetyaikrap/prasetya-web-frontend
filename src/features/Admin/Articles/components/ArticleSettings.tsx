import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  FormControl,
  FormLabel,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";

export function ArticleSettings() {
  return (
    <Accordion allowToggle width="full" maxWidth="1000px">
      <AccordionItem>
        <AccordionButton>
          <HStack width="full" justifyContent="space-between">
            <Text>Settings</Text>
            <AccordionIcon />
          </HStack>
        </AccordionButton>
        <AccordionPanel>
          <VStack width="full">
            <FormControl>
              <FormLabel>Publicity</FormLabel>
              <Select size="sm" />
            </FormControl>
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
