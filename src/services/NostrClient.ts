import { Filter, getPublicKey, Relay } from 'nostr-tools';
import { finalize, Observable, Subject, takeUntil } from 'rxjs';
import { hexStringToUint8Array } from '@utils/Utils';

export class NostrClient {
  public relay: Relay;
  private publicKey: string;

  constructor(options: { relayUrl: string; privateKey: string }) {
    this.relay = new Relay(options.relayUrl);
    this.relay.connect();

    const privateKeyUint8Array = hexStringToUint8Array(options.privateKey);
    this.publicKey = getPublicKey(privateKeyUint8Array);
  }

  subscribeEvent(filters: Filter[]) {
    const subject$ = new Subject<any>();
    const destroy$ = new Subject<void>();

    const subscription = this.relay.subscribe(filters, {
      onevent(event) {
        subject$.next(event);
      }
    });

    const observable$ = subject$.pipe(
      takeUntil(destroy$),
      finalize(() => {
        subscription.close();
      })
    );

    return {
      relaySubscription: subscription,
      observable$,
      destroy: () => {
        destroy$.next();
        destroy$.complete();
      }
    };
  }
}
