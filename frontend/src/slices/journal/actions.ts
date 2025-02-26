import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppRoute } from '#libs/enums/enums.js';
import { type AsyncThunkConfig } from '#libs/types/types.js';
import {
  type JournalEntryCreateRequestDto,
  type JournalEntryGetAllItemResponseDto,
  type JournalEntryGetAllResponseDto,
  type JournalEntryUpdatePayloadDto,
} from '#packages/journal/journal.js';
import { actions as appActions } from '#slices/app/app.js';
import { actions as journalActions } from '#slices/journal/journal.js';

import { name as sliceName } from './journal.slice.js';

const createJournalEntry = createAsyncThunk<
  JournalEntryGetAllItemResponseDto,
  JournalEntryCreateRequestDto,
  AsyncThunkConfig
>(`${sliceName}/create-journal-entry`, async (payload, { extra, dispatch }) => {
  const { journalApi } = extra;
  const journalEntry = await journalApi.createJournalEntry(payload);
  dispatch(
    appActions.navigate(
      AppRoute.JOURNAL_$ID.replace(
        ':id',
        String(journalEntry.id),
      ) as typeof AppRoute.JOURNAL_$ID,
    ),
  );

  return journalEntry;
});

const getAllJournalEntries = createAsyncThunk<
  JournalEntryGetAllResponseDto,
  string,
  AsyncThunkConfig
>(`${sliceName}/get-all-journal-entries`, async (query, { extra }) => {
  const { journalApi } = extra;

  return await journalApi.getAllJournalEntries(query);
});

const updateJournalEntry = createAsyncThunk<
  JournalEntryGetAllItemResponseDto,
  JournalEntryUpdatePayloadDto,
  AsyncThunkConfig
>(`${sliceName}/update-journal-entry`, async (payload, { extra }) => {
  const { journalApi } = extra;

  return await journalApi.updateJournalEntry(payload);
});

const deleteJournal = createAsyncThunk<
  JournalEntryGetAllItemResponseDto[],
  number,
  AsyncThunkConfig
>(
  `${sliceName}/delete-journal-entry`,
  async (id, { extra, getState, dispatch }) => {
    const { journalApi } = extra;
    await journalApi.deleteJournalEntry(id);
    const {
      journal: { allJournalEntries, selectedJournalEntry },
    } = getState();

    if (selectedJournalEntry?.id === id) {
      dispatch(journalActions.setSelectedJournalEntry(null));
    }

    return allJournalEntries.filter((journal) => {
      return journal.id !== id;
    });
  },
);

export {
  createJournalEntry,
  deleteJournal,
  getAllJournalEntries,
  updateJournalEntry,
};
