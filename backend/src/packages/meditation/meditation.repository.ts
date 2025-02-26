import { type Repository } from '#libs/types/types.js';

import { MeditationEntriesRelation } from './libs/enums/enums.js';
import {
  type MeditationCommonQueryResponse,
  type MeditationCreateQueryPayload,
} from './libs/types/types.js';
import { MeditationEntity } from './meditation.entity.js';
import { type MeditationEntryModel } from './meditation-entry.model.js';

class MeditationRepository implements Repository {
  private meditationEntryModel: typeof MeditationEntryModel;

  public constructor(meditationEntryModel: typeof MeditationEntryModel) {
    this.meditationEntryModel = meditationEntryModel;
  }

  public find(): ReturnType<Repository['find']> {
    return Promise.resolve(null);
  }

  public async findByUserId(userId: number): Promise<MeditationEntity[]> {
    const meditationEntries = await this.meditationEntryModel
      .query()
      .where({ userId })
      .orWhere({ userId: null })
      .castTo<MeditationCommonQueryResponse[]>();

    return meditationEntries.map((meditationEntry) => {
      return MeditationEntity.initialize({
        id: meditationEntry.id,
        name: meditationEntry.name,
        mediaUrl: meditationEntry.mediaUrl,
        contentType: meditationEntry.contentType,
        userId: meditationEntry.userId,
        createdAt: new Date(meditationEntry.createdAt),
        updatedAt: new Date(meditationEntry.updatedAt),
      });
    });
  }

  public findAll(): ReturnType<Repository['findAll']> {
    return Promise.resolve([]);
  }

  public async create(entity: MeditationEntity): Promise<MeditationEntity> {
    const { name, mediaUrl, contentType, userId } = entity.toObject();

    const meditationEntry = await this.meditationEntryModel
      .query()
      .insertGraph({
        name,
        mediaUrl,
        contentType,
        topicId: null,
        userId,
      } as MeditationCreateQueryPayload)
      .withGraphJoined(MeditationEntriesRelation.TOPIC)
      .castTo<MeditationCommonQueryResponse>();

    return MeditationEntity.initialize({
      id: meditationEntry.id,
      name: meditationEntry.name,
      mediaUrl: meditationEntry.mediaUrl,
      contentType: meditationEntry.contentType,
      userId: meditationEntry.userId,
      createdAt: new Date(meditationEntry.createdAt),
      updatedAt: new Date(meditationEntry.updatedAt),
    });
  }

  public update(): ReturnType<Repository['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Repository['delete']> {
    //TODO
    const deletedCount = 0;

    return Promise.resolve(deletedCount);
  }
}

export { MeditationRepository };
