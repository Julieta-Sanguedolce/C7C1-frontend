import { useDisclosure, Button } from "@chakra-ui/react";

import { useState } from "react";
import CheckUrl from "./CheckUrl";
import AddResouce from "./AddResource";

export default function CheckAndAddResources(): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [userUrl, setUserUrl] = useState("");
    const [recommendationInputView, setRecommendationInputView] =
        useState<boolean>(false);

    function handleCancel() {
        setUserUrl("");
        onClose();
        setRecommendationInputView(false);
    }

    return (
        <>
            <Button onClick={onOpen}>Add new resource</Button>
            {!recommendationInputView && (
                <CheckUrl
                    setRecommendationInputView={setRecommendationInputView}
                    onClose={onClose}
                    isOpen={isOpen}
                    userUrl={userUrl}
                    setUserUrl={setUserUrl}
                    handleCancel={handleCancel}
                />
            )}
            {recommendationInputView && (
                <AddResouce
                    onClose={onClose}
                    isOpen={isOpen}
                    handleCancel={handleCancel}
                    userUrl={userUrl}
                />
            )}
        </>
    );
}
