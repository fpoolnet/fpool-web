import { Filter } from 'nostr-tools';
import { Observable } from 'rxjs';
import { NOSTR_PRIVATE_KEY, RELAY_URL } from '@constants/config';
import { NostrClient } from '@services/NostrClient';
import { getTimeBeforeDaysInSeconds } from '@utils/Utils';
import { beautify } from '@utils/beautifierUtils';

class MiningService {
  private nostrClient: NostrClient;
  private pplnsSubscription: any;

  constructor() {
    const relays = [RELAY_URL];
    this.nostrClient = new NostrClient({ relays, privateKey: NOSTR_PRIVATE_KEY });
  }

  subscribePplns(address: string): Observable<any> {
    if (this.pplnsSubscription) {
      this.pplnsSubscription.destroy();
      this.pplnsSubscription = null;
    }

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

    const { observable$, destroy } = this.nostrClient.subscribeEvent(filters);

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

    this.pplnsSubscription = { observable$: beautifiedObservable$, destroy };
    return beautifiedObservable$;
  }
}

export default new MiningService();
