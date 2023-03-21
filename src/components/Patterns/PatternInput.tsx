import { Icon, Input, InputGroup, InputLeftElement, InputProps } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface PatternInputProps extends InputProps {
    icon?: IconType
};

export function PatternInput({ icon, ...rest }: PatternInputProps) {
    return (
        <InputGroup>
            {icon && (
                <InputLeftElement
                    children={<Icon as={icon} mt={2} ml={1} color='primary.300' fontSize="1.5rem" />}
                />
            )}
            <Input
                variant="filled"
                _focus={{ bg: "#EDF2F7" }}
                focusBorderColor="primary.500"
                size="lg"
                {...rest}
            />
        </InputGroup>
    );
};