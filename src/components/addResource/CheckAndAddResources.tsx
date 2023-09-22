import { useDisclosure, Button } from "@chakra-ui/react";

import { useState } from "react";
import CheckUrl from "./CheckUrl";
import AddResouce from "./AddResource";
import { User } from "../../types/User";
import { Recommendation } from "../../types/Recommendation";

interface CheckAndAddResourcesProps {
    currentUser: User;
    setRecommendationList: (r: Recommendation[]) => void;
}

export default function CheckAndAddResources({
    currentUser,
    setRecommendationList,
}: CheckAndAddResourcesProps): JSX.Element {
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
                    setRecommendationList={setRecommendationList}
                    setRecommendationInputView={setRecommendationInputView}
                    onClose={onClose}
                    isOpen={isOpen}
                    handleCancel={handleCancel}
                    userUrl={userUrl}
                    setUserUrl={setUserUrl}
                    currentUser={currentUser}
                />
            )}
        </>
    );
}