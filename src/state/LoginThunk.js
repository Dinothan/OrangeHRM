import {createAsyncThunk} from '@reduxjs/toolkit';

export const getUserInfo = createAsyncThunk('getUserInfo', async token => {
  try {
    const response = await fetch(
      `https://graph.instagram.com/${token?.user_id}?fields=id,username&access_token=${token?.access_token}`,
    )
      .then(res => {
        return res.json().then(data => {
          return data;
        });
      })
      .catch(e => console.log(e));
    return response;
  } catch (error) {
    console.log(error);
  }
});
