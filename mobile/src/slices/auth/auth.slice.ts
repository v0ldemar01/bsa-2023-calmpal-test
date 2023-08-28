import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '#libs/enums/enums';
import { type ValueOf } from '#libs/types/types';
import { type UserAuthResponseDto } from '#packages/users/users';

import { createUserSurveyPreferences, signUp } from './actions';

type State = {
  authenticatedUser: UserAuthResponseDto | null;
  authenticatedUserDataStatus: ValueOf<typeof DataStatus>;
  dataStatus: ValueOf<typeof DataStatus>;
  surveyPreferencesDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  authenticatedUser: null,
  authenticatedUserDataStatus: DataStatus.IDLE,
  dataStatus: DataStatus.IDLE,
  surveyPreferencesDataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'auth',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(signUp.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(signUp.fulfilled, (state) => {
      state.dataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });

    builder.addCase(createUserSurveyPreferences.pending, (state) => {
      state.surveyPreferencesDataStatus = DataStatus.PENDING;
    });
    builder.addCase(createUserSurveyPreferences.fulfilled, (state) => {
      // if(state.authenticatedUser) {
      //   state.authenticatedUser.isSurveyCompleted = action.payload;
      // }
      state.surveyPreferencesDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(createUserSurveyPreferences.rejected, (state) => {
      state.surveyPreferencesDataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
