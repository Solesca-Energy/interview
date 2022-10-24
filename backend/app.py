from flask import Flask, json, request
from shapely.geometry import Polygon, MultiPolygon
from shapely import affinity
from svgpath2mpl import parse_path
from math import floor
from random import randrange

import time

app = Flask(__name__)


def make_pear_book_polygons(data, border_radius):
    window_dims = data['windowDims']
    # width and height of PearBook
    width = window_dims[0]*0.66
    height = window_dims[1]*0.80
    pear_book_path = f'M{border_radius} 0h${width-2*border_radius}s\
                    {border_radius} 0 {border_radius} {border_radius}\
                    v{height-2*border_radius}s0 {border_radius}\
                    -{border_radius} {border_radius} h-{width-2*border_radius}\
                    s-{border_radius} 0 -{border_radius} -{border_radius}\
                    v-{height-2*border_radius}s0 -{border_radius}\
                    {border_radius} -{border_radius}'
    pearLogo_stem = Polygon(parse_path(
        "M76.43 40.94C76.43 40.94 68.71 8.26 107.27 0C107.27 0 113.45 35.02 76.43\
         40.94V40.94Z").to_polygons()[0])
    pearLogo_body = Polygon(parse_path(
        "M76.2402 49.82C76.2402 49.82 51.1602 34.05 40.4502\
                            68.77C29.7402 103.49 16.5402 119.93 9.70022 130.52C-1.78978\
                            148.31 -3.82978 182.31 15.4402 207.71C31.2702 228.58\
                            55.6802 233.59 75.2302 233.98C94.7802 234.37 120.23\
                            226.08 135 210.26C149.77 194.44 151.44 172.08 151.63\
                            165.23C151.63 165.23 121.93 156.1 115.08 131C108.23 105.9\
                            119.6 93.13 119.6 93.13C119.6 93.13 110.51 77.05 106.96\
                            63.32C103.19 48.78 91.7502 38.61 76.2402 49.82V49.82Z"
    ).to_polygons()[0])
    # width and height of the pear logo
    pear_width = 152
    pear_height = 234
    pearLogo_stem_translated = affinity.translate(
        pearLogo_stem, xoff=(width-pear_width)/2, yoff=(height-pear_height)/2)
    pearLogo_body_translated = affinity.translate(
        pearLogo_body, xoff=(width-pear_width)/2, yoff=(height-pear_height)/2)
    pear_logo = MultiPolygon(
        [pearLogo_stem_translated, pearLogo_body_translated])
    pear_logo_dims = [pear_width, pear_height]
    pear_book = Polygon(parse_path(pear_book_path).to_polygons()[0])
    pear_book_dims = [width, height]

    return pear_book, pear_book_dims, pear_logo, pear_logo_dims


def make_sticker_polygons(data):
    sticker_paths = data['stickerPaths']
    sticker_data = []
    for sticker_path in sticker_paths:
        sticker_data.append({'polygon':
                             Polygon(parse_path(
                                 sticker_path['outline']).to_polygons()[0]),
                             'width': sticker_path['width'],
                             'height': sticker_path['height'],
                             'i': sticker_path['i']})
    return sticker_data


@app.route("/stickers", methods=['POST'])
def stickers_layout():
    data = json.loads(request.data)
    pear_book, pear_book_dims, pear_logo, pear_logo_dims = make_pear_book_polygons(
        data, 24)
    sticker_data = make_sticker_polygons(data)

    sticker_response = []
    start_time = time.time()
    # YOUR CODE HERE
    # ------------------------------------------------------------------------
    
    # ------------------------------------------------------------------------
    # END OF YOUR CODE
    end_time = time.time()

    # in ms
    run_time = int((end_time-start_time) * 1000)

    # calc how much of the PearBook is uncovered
    uncovered = pear_book
    for sticker in sticker_response:
        # first rotate the sticker
        rotated_shape = affinity.rotate(
            sticker_data[sticker['i']-1]['polygon'], sticker['rotation'])
        # then translate it
        rotated_and_translated_shape = affinity.translate(
            rotated_shape, xoff=sticker['position'][0],
            yoff=sticker['position'][1])
        # subtract the sticker from the uncovered portion
        uncovered = uncovered.difference(
            rotated_and_translated_shape)

    # calculate the percent sticker coverage of the pearBook
    # Pear logo doesn't count
    coverage = round((1 - (uncovered.area - pear_logo.area) /
                     (pear_book.area - pear_logo.area))*100, 1)

    return {'stickers': sticker_response, 'coverage': coverage, 'runTime': run_time}
