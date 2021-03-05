export const getNeededInfos = (response) => {
    return response.map((item) => {
        return {
            id: item.ID,
            location: item.Name,
            description: item.DescriptionDetail
        }
    });
};