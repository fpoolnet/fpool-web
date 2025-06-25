import { beautifierConfig } from '@constants/beautifierConfig';

export const beautify = (event: any) => {
  const map = beautifierConfig[event.kind];

  if (!map) {
    return event;
  }

  const result: any = {
    id: event.id
  };

  event.tags.forEach(([tagKey, tagValue]: [string, string]) => {
    const fieldKey = map[tagKey];
    if (fieldKey) {
      result[fieldKey] = isNaN(Number(tagValue)) ? tagValue : Number(tagValue);
    }
  });

  return result;
};
