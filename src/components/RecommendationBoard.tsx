import { Box, Container, HStack, SimpleGrid, Stack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../types/User";
import { baseURL } from "./App";
import { SearchBar } from "./SearchBar";
import TagCloud from "./TagCloud";
import UserMenu from "./UserMenu";
import RecommendationCard from "./recommendationCard/RecommendationCard";

interface RecommendationBoardProps {
    currentUser: User | undefined;
}

// interface UserComment {
//     user_name: string;
//     comment: string;
// }

export interface Recommendation {
    url: string;
    name: string;
    author: string;
    description: string;
    content_type: string;
    build_phase: string;
    creation_date: Date; //verify specific type for this one
    user_id: number;
    recommendation_type: string;
    // | "I recommend this resource after having used it"
    // | "I do not recommend this resource, having used it"
    // | "I haven't used this resource but it looks promising";
    reason: string;
    like_count: number;
    dislike_count: number;
    tags: string;
}

export default function RecommendationBoard({
    currentUser,
}: RecommendationBoardProps): JSX.Element {
    const [recommendationList, setRecommendationList] = useState<
        Recommendation[]
    >([]);
    const [searchedPhrase, setSearchedPhrase] = useState("");
    const [searchTags, setSearchTags] = useState<string[]>([]);
    const [studyView, setStudyView] = useState<boolean>(false);

    useEffect(() => {
        fetchRecommendations(setRecommendationList, studyView, currentUser?.id);
    }, [studyView, currentUser?.id]);

    return (
        <>
            <HStack pt={"1vh"}>
                {currentUser !== undefined && (
                    <UserMenu
                        currentUser={currentUser}
                        studyView={studyView}
                        setStudyView={setStudyView}
                        setRecommendationList={setRecommendationList}
                    />
                )}
                {!studyView && (
                    <SearchBar
                        searchedPhrase={searchedPhrase}
                        setSearchedPhrase={setSearchedPhrase}
                        setRecommendationList={setRecommendationList}
                        searchTags={searchTags}
                        setSearchTags={setSearchTags}
                        currentUser={currentUser}
                    />
                )}
            </HStack>
            <Stack pt={"2vh"} direction="row" align="flex-start">
                <SimpleGrid spacing="10px" minWidth="70%" columns={3}>
                    {recommendationList.map((r) => (
                        <Box key={r.url}>
                            <RecommendationCard
                                setRecommendationList={setRecommendationList}
                                oneRecommendation={r}
                                currentUser={currentUser}
                            />
                        </Box>
                    ))}
                </SimpleGrid>

                {!studyView && (
                    <Container minWidth={"30%"}>
                        <TagCloud
                            searchTags={searchTags}
                            setSearchTags={setSearchTags}
                        />
                    </Container>
                )}
            </Stack>
        </>
    );
}

export async function fetchRecommendations(
    setRecommendationList: (rec: Recommendation[]) => void,
    studyView: boolean,
    user_id: number | undefined
) {
    let endpoint = "";
    if (studyView && user_id) {
        endpoint = "/study-list/" + user_id.toString();
    } else {
        endpoint = "/recommendation/recent10";
    }
    try {
        const response = await axios.get(`${baseURL}${endpoint}`);
        const responseList = response.data;
        setRecommendationList(responseList);
    } catch (error) {
        console.error(error);
    }
}
