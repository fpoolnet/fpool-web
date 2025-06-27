import { Filter } from 'nostr-tools';
import { Observable } from 'rxjs';
import { NOSTR_PRIVATE_KEY, RELAY_URL } from '@constants/config';
import { NostrClient } from '@services/NostrClient';
import { getTimeBeforeDaysInSeconds } from '@utils/Utils';
import { beautify } from '@utils/beautifierUtils';

class MiningService {
  public nostrClient: NostrClient;
  public pplnsSubscription: any;

  constructor() {
    this.nostrClient = new NostrClient({ relayUrl: RELAY_URL, privateKey: NOSTR_PRIVATE_KEY });
  }

  subscribePplns(address: string): Observable<any> {
    this.stopPplns();

    const filters: Filter[] = [
      {
        kinds: [35504],
        since: getTimeBeforeDaysInSeconds(5),
        [`#a`]: [address]
      },
      {
        kinds: [35504],
        limit: 500,
        [`#a`]: [address]
      }
    ];

    const { relaySubscription, observable$, destroy } = this.nostrClient.subscribeEvent(filters);

    const beautifiedObservable$ = new Observable<any>((subscriber) => {
      const subscription = observable$.subscribe({
        next: (event: any) => {
          try {
            const beautifiedEvent = beautify(event);
            subscriber.next(beautifiedEvent);
          } catch (error) {
            subscriber.error(error);
          }
        },
        error: (error: any) => subscriber.error(error),
        complete: () => subscriber.complete()
      });

      return () => {
        subscription.unsubscribe();
        destroy();
      };
    });

    this.pplnsSubscription = { relaySubscription, observable$: beautifiedObservable$, destroy };
    return beautifiedObservable$;
  }

  stopPplns() {
    if (this.pplnsSubscription) {
      this.pplnsSubscription.destroy();
      this.pplnsSubscription = null;
    }
  }
}

export default new MiningService();
