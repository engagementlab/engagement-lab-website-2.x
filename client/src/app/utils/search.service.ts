import { Injectable } from '@angular/core';

import { isScullyGenerated, TransferStateService } from '@scullyio/ng-lib';

// import * as _ from 'underscore';

@Injectable()
export class SearchService {
    public results: Record<string, unknown>;

    public async search(query: string) {
        // If scully is building or dev build, cache data from content API in transferstate
        if (isScullyGenerated()) { return; }

        // Our API is already set up to return JSON from an ElasticSearch instance
        await fetch(`/get/search/${query}`)
            .then((data) => data.json())
            .then((results) => { this.results = results; });

        return this.results;
    }
}
