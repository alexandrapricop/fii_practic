export const clusterLayer = {
    id: 'clusters',
    type: 'circle',
    source: 'restaurants',
    filter: ['has', 'point_count'],
    paint: {
        'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            100,
            '#f1f075',
            750,
            '#f28cb1'
        ],
        'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
    }
};

export const clusterCountLayer = {
    id: 'cluster-count',
    type: 'symbol',
    source: 'restaurants',
    filter: ['has', 'point_count'],
    layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
    }
};

export const unclusteredPointLayer = {
    id: 'unclustered-point',
    type: 'symbol',
    source: 'points',
    layout: {
        'icon-image': ['concat', ['get', 'icon'], '-15'],
        'icon-allow-overlap': true,
        'icon-size': 1,
        'text-allow-overlap': true,
        'text-field': ['get', 'title'],
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 1],
        'text-anchor': 'top',
        'text-size': 11
    },
    paint: {
        'text-color': 'white'
    }
};