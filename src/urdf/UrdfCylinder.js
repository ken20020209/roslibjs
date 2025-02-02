/**
 * @fileOverview
 * @author Benjamin Pitzer - ben.pitzer@gmail.com
 * @author Russell Toris - rctoris@wpi.edu
 */

var UrdfTypes = require('./UrdfTypes');

/**
 * A Cylinder element in a URDF.
 */
class UrdfCylinder {
  /**
   * @param {Object} options
   * @param {Element} options.xml - The XML element to parse.
   */
  constructor(options) {
    this.type = UrdfTypes.URDF_CYLINDER;
    // @ts-expect-error -- possibly null
    this.length = parseFloat(options.xml.getAttribute('length'));
    // @ts-expect-error -- possibly null
    this.radius = parseFloat(options.xml.getAttribute('radius'));
  }
}

module.exports = UrdfCylinder;
