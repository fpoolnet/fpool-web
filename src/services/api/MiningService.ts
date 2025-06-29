import { Filter } from 'nostr-tools';
import { Observable } from 'rxjs';
import { NOSTR_PRIVATE_KEY, RELAY_URL } from '@constants/config';
import { NostrClient } from '@services/NostrClient';
import { getTimeBeforeDaysInSeconds } from '@utils/Utils';
import { beautify } from '@utils/beautifierUtils';
import { SubscriptionParams } from 'nostr-tools/lib/types/relay';

class MiningService {
  public nostrClient: NostrClient;
  public pplnsSubscription: any;

  constructor() {
    this.nostrClient = new NostrClient({ relayUrl: RELAY_URL, privateKey: NOSTR_PRIVATE_KEY });
  }

  subscribePplns(address: string, subscriptionParams: SubscriptionParams) {
    this.stopPplns();

    const filters: Filter[] = [
      {
        kinds: [35505],
        since: getTimeBeforeDaysInSeconds(5),
        [`#a`]: [address]
      },
      {
        kinds: [35505],
        limit: 500,
        [`#a`]: [address]
      }
    ];

    this.pplnsSubscription = this.nostrClient.subscribeEvent(filters, subscriptionParams);
    return this.pplnsSubscription;
  }

  stopPplns() {
    if (this.pplnsSubscription) {
      this.pplnsSubscription.close();
      this.pplnsSubscription = null;
    }
  }
}

export default new MiningService();
