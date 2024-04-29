import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IInvite, IInvitesState } from '@store/reducers';

const initialState: IInvitesState = {
  availableInviteCount: 0,
  usedInvitesList: [],
};

export const invitesSlice = createSlice({
  name: 'invites',
  initialState,
  reducers: {
    setAvailableInvitesCount: (
      state: IInvitesState,
      { payload }: PayloadAction<number>,
    ) => {
      state.availableInviteCount = payload;
    },
    setUsedInvitesList: (
      state: IInvitesState,
      { payload }: PayloadAction<IInvite[]>,
    ) => {
      state.usedInvitesList = payload;
    },
    updateInviteStatus: (
      state: IInvitesState,
      {
        payload,
      }: PayloadAction<{ inviteId: string; status: 'SENT' | 'REDEEMED' }>,
    ) => {
      const invite = state.usedInvitesList.find(
        inv => inv.inviteId === payload.inviteId,
      );
      if (invite) {
        invite.status = payload.status;
      }
    },
  },
});

export const {
  setAvailableInvitesCount,
  setUsedInvitesList,
  updateInviteStatus,
} = invitesSlice.actions;

export default invitesSlice.reducer;
