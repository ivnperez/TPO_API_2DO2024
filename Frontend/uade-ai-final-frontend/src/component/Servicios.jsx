import 'bootstrap/dist/css/bootstrap.css';
import '../css/vendor.css';
import '../css/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar,faTag,faTruck,faUserShield} from '@fortawesome/free-solid-svg-icons'


function Servicios(){
    return(
        <>
        <section id="company-services" className="padding-large">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 pb-3">
                        <div className="icon-box d-flex">
                            <div className="icon-box-icon pe-3 pb-3">
                                    <FontAwesomeIcon icon={faTruck} className='car-outline' />
                            </div>
                            <div className="icon-box-content">
                                <h3 className="card-title text-uppercase text-dark">Servicio disponible las 24 horas</h3>
                                <p>Atendemos URGENCIAS en todo momento y resolvemos en menos de 1 hora</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 pb-3">
                        <div className="icon-box d-flex">
                            <div className="icon-box-icon pe-3 pb-3">
                                <FontAwesomeIcon icon={faStar} className='quality' />
                            </div>
                            <div className="icon-box-content">
                                <h3 className="card-title text-uppercase text-dark">Servicios de Calidad</h3>
                                <p>Nos comprometemos a ofrecerte el mejor servicio al menor precio</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 pb-3">
                        <div className="icon-box d-flex">
                            <div className="icon-box-icon pe-3 pb-3">
                                <FontAwesomeIcon icon={faTag} className='price-tag' />
                            </div>
                            <div className="icon-box-content">
                                <h3 className="card-title text-uppercase text-dark">Disponibilidad 24 Horas</h3>
                                <p>Resolucion de problemas a cualquier hora del dia.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 pb-3">
                        <div className="icon-box d-flex">
                            <div className="icon-box-icon pe-3 pb-3">
                                <FontAwesomeIcon icon={faUserShield} className='shield-plus' />
                            </div>
                            <div className="icon-box-content">
                                <h3 className="card-title text-uppercase text-dark">Pago 100% seguro</h3>
                                <p>Realiza tus pagos con total tranquilidad gracias a nuestro sistema de pago completamente seguro y protegido.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}
export default Servicios
