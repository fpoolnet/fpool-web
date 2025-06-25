import { Filter, getPublicKey, SimplePool } from 'nostr-tools';
import { finalize, Observable, Subject, takeUntil } from 'rxjs';
import { hexStringToUint8Array } from '@utils/Utils';

export class NostrClient {
  private pool: SimplePool;
  private relays: string[];
  private publicKey: string;

  constructor(options: { relays: string[]; privateKey: string }) {
    this.pool = new SimplePool();
    this.relays = options.relays;
    const privateKeyUint8Array = hexStringToUint8Array(options.privateKey);
    this.publicKey = getPublicKey(privateKeyUint8Array);
  }

  subscribeEvent(filters: Filter[]): { observable$: Observable<any>; destroy: () => void } {
    const subject$ = new Subject<any>();
    const destroy$ = new Subject<void>();

    const subCloser = this.pool.subscribeMany(this.relays, filters, {
      onevent(event) {
        subject$.next(event);
      }
    });

    const observable$ = subject$.pipe(
      takeUntil(destroy$),
      finalize(() => {
        subCloser.close();
      })
    );

    return {
      observable$,
      destroy: () => {
        destroy$.next();
        destroy$.complete();
      }
    };
  }
}
