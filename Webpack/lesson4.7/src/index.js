import _ from 'lodash'
import $ from 'jquery'

const dom = $('<div>')
dom.html(_.join(['小', '王']))

$('body').append(dom)
