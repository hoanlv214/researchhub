import { GLOBALTYPES } from "./globalTypes"
import { getDataAPI, postDataAPI, patchDataAPI, deleteDataAPI } from "../../utils/fetchData"

export const PUBLICATION_TYPES = {
    LOADING_PUBLICATION: "LOADING_PUBLICATION",
    CREATE_PUBLICATION: "CREATE_PUBLICATION",
    GET_PUBLICATION: "GET_PUBLICATION",
    UPDATE_PUBLICATION: "UPDATE_PUBLICATION",
    DELETE_PUBLICATION: "DELETE_PUBLICATION",
}

export const getPublications = ({ userId, auth }) => async (dispatch) => {
    dispatch({ type: PUBLICATION_TYPES.LOADING_PUBLICATION, payload: true });

    try {
        const res = await getDataAPI(`publication/${userId}`, auth.token);
        console.log("res action:", res.data);
        dispatch({
            type: PUBLICATION_TYPES.GET_PUBLICATION,
            payload: res.data, // Update this line
        });
        dispatch({ type: PUBLICATION_TYPES.LOADING_PUBLICATION, payload: false });
        return res.data; // Add this line to return the response data
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg },
        });
    }
};

export const createPublication = (newPublication, auth) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        const res = await postDataAPI("publication", newPublication, auth);
        console.log("res create pub:", res);
        dispatch({
            type: PUBLICATION_TYPES.CREATE_PUBLICATION,
            payload: { ...res.data.newPublication, user: auth.user },
        });
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg },
        });
    }
};

export const updatePublication = (id,
    { title, citation, conference, pages, publisher, description, author, year }, auth) => async (dispatch) => {

        try {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

            const res = await patchDataAPI(`publication/${id}`, {
                title, citation, conference, pages, publisher, description, author, year
            }, auth);
            console.log("update publication", res.data)

            dispatch({ type: PUBLICATION_TYPES.UPDATE_PUBLICATION, payload: res.data.newPublication });
            dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
        } catch (err) {
            console.log("err action", err)
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.response.data.msg },
            });
        }
    };


export const deletePublication = (publicationId, token) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        const res = await deleteDataAPI(`publication/${publicationId}`, token);
        console.log("delete publication", res);
        dispatch({
            type: PUBLICATION_TYPES.DELETE_PUBLICATION,
            payload: publicationId,
        });
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.message },
        });
    }
};
