import { Injectable } from '@angular/core';

import { isScullyGenerated, TransferStateService } from '@scullyio/ng-lib';

import * as _ from 'underscore';

@Injectable()
export class SearchService {

  public results: object;

  public async search(query: string) {
    // If scully is building or dev build, cache data from content API in transferstate
    if (isScullyGenerated()) { return; }

    // Our API is already set up to return JSON from an ElasticSearch instance
    fetch(`/get/search/${query}`)
      .then((data) => { return data.json() })
      .then((results) => {
        return results;
      });
  }
}
