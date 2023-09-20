import { Text } from "@chakra-ui/react";

export default function Header(): JSX.Element {
    return (
        <div>
            <Text pt={25} textAlign={["center"]} fontSize={32}>
                Study Resource Catalog WebApp
            </Text>
        </div>
    );
}
