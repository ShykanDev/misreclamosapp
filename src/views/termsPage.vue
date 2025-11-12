<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-back-button defaultHref="/tabs/register" :icon="arrowBack" text="Volver" slot="start" style="text-transform: none;" />
                <ion-title class="text-center">Términos y Condiciones</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
                <section class="flex justify-center items-center p-4 min-h-screen bg-gray-50 border-2 border-rose-600">
                    <div class="p-8 w-full bg-white rounded-xl shadow-md max-w-8xl md:p-10">
                        <header class="mb-8 text-center">
                            <div class="flex justify-center mb-4">
                                <v-icon name="md-description" class="text-5xl text-blue-600" />
                            </div>
                            <h1 class="mb-2 text-3xl font-bold text-gray-800 md:text-4xl">Términos y Condiciones</h1>
                            <p class="text-sm text-gray-500">Última actualización: 8 de octubre de 2025</p>
                        </header>

                        <main class="space-y-8 text-gray-700">
                            <!-- Introducción -->
                            <section class="flex space-x-4">
                                <div class="hidden md:block">
                                    <v-icon name="md-announcement" class="mt-1 text-2xl text-blue-500" />
                                </div>
                                <div class="flex-1">
                                    <h2 class="flex items-center mb-3 space-x-2 text-xl font-semibold text-gray-800">
                                        <v-icon name="md-announcement" class="text-xl text-blue-500 md:hidden" />
                                        <span>Introducción</span>
                                    </h2>
                                    <p>Estos términos y condiciones ("Términos") regulan el uso de la aplicación "Mis Reclamos"
                    ("Aplicación"). Al acceder y utilizar la Aplicación, aceptas cumplir y estar sujeto a estos
                    Términos.</p>
                                    <p class="leading-relaxed text-justify">
                                        Bienvenido a nuestra aplicación MisReclamos. Al acceder y utilizar nuestros servicios,
                                        aceptas cumplir y estar sujeto a los siguientes Términos y Condiciones. Te
                                        recomendamos leerlos detenidamente, ya que establecen los derechos y
                                        obligaciones tanto tuyos como nuestros durante el uso de la plataforma.
                                    </p>
                                    <p class="mt-3 leading-relaxed text-justify">
                                        Estos términos aplican a todos los usuarios, incluyendo visitantes, registrados
                                        y cualquier persona que interactúe con nuestros servicios. Si no estás de
                                        acuerdo con alguna parte de estos términos, te solicitamos que no utilices la
                                        aplicación.
                                    </p>
                                </div>
                            </section>

                            <!-- Aceptación de los Términos -->
                            <section class="flex space-x-4">
                                <div class="hidden md:block">
                                    <v-icon name="md-policy" class="mt-1 text-2xl text-blue-500" />
                                </div>
                                <div class="flex-1">
                                    <h2 class="flex items-center mb-3 space-x-2 text-xl font-semibold text-gray-800">
                                        <v-icon name="md-policy" class="text-xl text-blue-500 md:hidden" />
                                        <span>Aceptación de los Términos</span>
                                    </h2>
                                    <p class="leading-relaxed text-justify">
                                        Al registrarte o utilizar cualquier servicio de nuestra aplicación, aceptas
                                        automáticamente estos Términos y Condiciones en su totalidad. También aceptas
                                        nuestra <a href="https://misreclamos.com/#/privacy-policy" class="text-blue-600 hover:underline">Política
                                            de Privacidad</a>, que describe cómo recopilamos, usamos y protegemos tu
                                        información personal.
                                    </p>
                                    <p class="mt-3 leading-relaxed text-justify">
                                        Nos reservamos el derecho de modificar estos términos en cualquier momento. En
                                        caso de cambios significativos, te notificaremos a través de la aplicación o por
                                        correo electrónico. El uso continuo de la plataforma después de dichos cambios
                                        constituirá tu aceptación de los nuevos términos.
                                    </p>
                                </div>
                            </section>

                            <!-- Registro y Cuenta de Usuario -->
                            <section class="flex space-x-4">
                                <div class="hidden md:block">
                                    <v-icon name="md-person-add" class="mt-1 text-2xl text-blue-500" />
                                </div>
                                <div class="flex-1">
                                    <h2 class="flex items-center mb-3 space-x-2 text-xl font-semibold text-gray-800">
                                        <v-icon name="md-person-add" class="text-xl text-blue-500 md:hidden" />
                                        <span>Registro y Cuenta de Usuario</span>
                                    </h2>
                                    <p class="leading-relaxed text-justify">
                                        Para acceder a ciertas funciones de la aplicación, es necesario que crees una
                                        cuenta. Al registrarte, te comprometes a proporcionar información precisa,
                                        completa y actualizada. Eres el único responsable de mantener la
                                        confidencialidad de tu contraseña y de todas las actividades que ocurran bajo tu
                                        cuenta.
                                    </p>
                                    <p class="mt-3 leading-relaxed text-justify">
                                        No debes compartir tu contraseña ni permitir que terceros utilicen tu cuenta. Si
                                        sospechas que tu cuenta ha sido comprometida, debes notificarnos de inmediato a
                                        <a href="mailto:informes@prasadam.mx"
                                            class="text-blue-600 hover:underline">informes@prasadam.mx</a>.
                                    </p>
                                </div>
                            </section>

                            <!-- Uso Apropiado de la Plataforma -->
                            <section class="flex space-x-4">
                                <div class="hidden md:block">
                                    <v-icon name="md-gavel" class="mt-1 text-2xl text-blue-500" />
                                </div>
                                <div class="flex-1">
                                    <h2 class="flex items-center mb-3 space-x-2 text-xl font-semibold text-gray-800">
                                        <v-icon name="md-gavel" class="text-xl text-blue-500 md:hidden" />
                                        <span>Uso Apropiado de la Plataforma</span>
                                    </h2>
                                    <p class="leading-relaxed text-justify">
                                        Te comprometes a utilizar la aplicación de manera lícita y conforme a todas las
                                        leyes aplicables. Prohibimos expresamente cualquier conducta que pueda dañar,
                                        deshabilitar o sobrecargar nuestros servidores, así como el uso de la plataforma
                                        para fines ilegales o no autorizados.
                                    </p>
                                    <p class="mt-3 leading-relaxed text-justify">
                                        Entre las actividades prohibidas se incluyen, sin limitarse a:
                                    </p>
                                    <ul class="pl-6 mt-2 space-y-2 leading-relaxed list-disc">
                                        <li>Publicar contenido ofensivo, difamatorio o discriminatorio.</li>
                                        <li>Violar los derechos de propiedad intelectual de terceros.</li>
                                        <li>Intentar acceder a cuentas o información de otros usuarios sin autorización.
                                        </li>
                                        <li>Distribuir malware, virus o cualquier otro código dañino.</li>
                                    </ul>
                                </div>
                            </section>

                            <!-- Propiedad Intelectual -->
                            <section class="flex space-x-4">
                                <div class="hidden md:block">
                                    <v-icon name="md-security" class="mt-1 text-2xl text-blue-500" />
                                </div>
                                <div class="flex-1">
                                    <h2 class="flex items-center mb-3 space-x-2 text-xl font-semibold text-gray-800">
                                        <v-icon name="md-security" class="text-xl text-blue-500 md:hidden" />
                                        <span>Propiedad Intelectual</span>
                                    </h2>
                                    <p class="leading-relaxed text-justify">
                                        Todo el contenido de la aplicación, incluyendo texto, gráficos, logos, íconos,
                                        imágenes y software, es propiedad exclusiva de nuestra empresa o de nuestros
                                        licenciantes y está protegido por las leyes de propiedad intelectual.
                                    </p>
                                    <p class="mt-3 leading-relaxed text-justify">
                                        No está permitido copiar, modificar, distribuir o utilizar cualquier parte de la
                                        aplicación sin nuestro consentimiento expreso por escrito. Las marcas
                                        registradas y logos no pueden ser utilizados sin autorización previa.
                                    </p>
                                </div>
                            </section>

                            <!-- Limitación de Responsabilidad -->
                            <section class="flex space-x-4">
                                <div class="hidden md:block">
                                    <v-icon name="md-warning" class="mt-1 text-2xl text-blue-500" />
                                </div>
                                <div class="flex-1">
                                    <h2 class="flex items-center mb-3 space-x-2 text-xl font-semibold text-gray-800">
                                        <v-icon name="md-warning" class="text-xl text-blue-500 md:hidden" />
                                        <span>Limitación de Responsabilidad</span>
                                    </h2>
                                    <p class="leading-relaxed text-justify">
                                        Nuestra aplicación se proporciona "tal cual" y "según disponibilidad". No
                                        garantizamos que la plataforma esté libre de errores, interrupciones o que
                                        cumpla con tus expectativas específicas. En la máxima medida permitida por la
                                        ley, no seremos responsables por daños indirectos, incidentales o
                                        consequenciales derivados del uso o la imposibilidad de usar nuestros servicios.
                                    </p>
                                    <p class="mt-3 leading-relaxed text-justify">
                                        No nos hacemos responsables por el contenido publicado por los usuarios, ni por
                                        las interacciones entre ellos. Eres el único responsable de tus acciones y de
                                        las consecuencias que estas puedan generar.
                                    </p>
                                </div>
                            </section>

                            <!-- Suspensión y Terminación -->
                            <section class="flex space-x-4">
                                <div class="hidden md:block">
                                    <v-icon name="md-exit-to-app" class="mt-1 text-2xl text-blue-500" />
                                </div>
                                <div class="flex-1">
                                    <h2 class="flex items-center mb-3 space-x-2 text-xl font-semibold text-gray-800">
                                        <v-icon name="md-exit-to-app" class="text-xl text-blue-500 md:hidden" />
                                        <span>Suspensión y Terminación</span>
                                    </h2>
                                    <p class="leading-relaxed text-justify">
                                        Nos reservamos el derecho de suspender o terminar tu acceso a la aplicación en
                                        cualquier momento, sin previo aviso, si determinamos que has violado estos
                                        términos o cualquier ley aplicable. También podemos tomar estas medidas si
                                        consideramos que tu conducta afecta negativamente a otros usuarios o a la
                                        integridad de la plataforma.
                                    </p>
                                    <p class="mt-3 leading-relaxed text-justify">
                                        En caso de terminación, todas las disposiciones que por su naturaleza deban
                                        sobrevivir, como las relacionadas con propiedad intelectual y limitación de
                                        responsabilidad, seguirán vigentes.
                                    </p>
                                </div>
                            </section>

                            <!-- Modificaciones a los Servicios -->
                            <section class="flex space-x-4">
                                <div class="hidden md:block">
                                    <v-icon name="md-update" class="mt-1 text-2xl text-blue-500" />
                                </div>
                                <div class="flex-1">
                                    <h2 class="flex items-center mb-3 space-x-2 text-xl font-semibold text-gray-800">
                                        <v-icon name="md-update" class="text-xl text-blue-500 md:hidden" />
                                        <span>Modificaciones a los Servicios</span>
                                    </h2>
                                    <p class="leading-relaxed text-justify">
                                        Nos reservamos el derecho de modificar, suspender o discontinuar cualquier parte
                                        de la aplicación en cualquier momento, con o sin notificación previa. No seremos
                                        responsables ante ti ni ante ningún tercero por cualquier cambio, suspensión o
                                        interrupción de nuestros servicios.
                                    </p>
                                    <p class="mt-3 leading-relaxed text-justify">
                                        También podemos introducir nuevas funciones o servicios, y establecer
                                        condiciones adicionales para su uso. El uso de estas nuevas funciones estará
                                        sujeto a los términos complementarios que publiquemos.
                                    </p>
                                </div>
                            </section>

                            <!-- Ley Aplicable y Resolución de Disputas -->
                            <section class="flex space-x-4">
                                <div class="hidden md:block">
                                    <v-icon name="md-lock-outline" class="mt-1 text-2xl text-blue-500" />
                                </div>
                                <div class="flex-1">
                                    <h2 class="flex items-center mb-3 space-x-2 text-xl font-semibold text-gray-800">
                                        <v-icon name="md-lock-outline" class="text-xl text-blue-500 md:hidden" />
                                        <span>Ley Aplicable y Resolución de Disputas</span>
                                    </h2>
                                    <p class="leading-relaxed text-justify">
                                        Estos términos se regirán e interpretarán de acuerdo con las leyes del país
                                        donde opera nuestra empresa. Cualquier disputa que surja en relación con estos
                                        términos o el uso de la aplicación se resolverá mediante negociación directa
                                        entre las partes.
                                    </p>
                                    <p class="mt-3 leading-relaxed text-justify">
                                        Si no se llega a un acuerdo, las partes acuerdan someterse a la jurisdicción
                                        exclusiva de los tribunales competentes en la ciudad donde se encuentra nuestra
                                        sede principal.
                                    </p>
                                </div>
                            </section>

                            <!-- Contacto -->
                            <section class="flex space-x-4">
                                <div class="hidden md:block">
                                    <v-icon name="fa-envelope" class="mt-1 text-2xl text-blue-500" />
                                </div>
                                <div class="flex-1">
                                    <h2 class="flex items-center mb-3 space-x-2 text-xl font-semibold text-gray-800">
                                        <span>Contacto</span>
                                    </h2>
                                    <p class="leading-relaxed text-justify">
                                        Si tienes preguntas o inquietudes sobre estos Términos y Condiciones, no dudes
                                        en contactarnos a través de <a href="mailto:informes@prasadam.mx"
                                            class="text-blue-600 hover:underline">informes@prasadam.mx</a>. Estamos aquí
                                        para ayudarte y aclarar cualquier duda que puedas tener.
                                    </p>
                                    <p class="mt-3 leading-relaxed text-justify">
                                        Agradecemos tu confianza en nuestra aplicación y esperamos que disfrutes de una
                                        experiencia positiva y segura.
                                    </p>
                                </div>
                            </section>
                        </main>
 
                    </div>
                </section>

        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { IonContent, IonPage, IonText, IonHeader, IonToolbar, IonTitle, IonBackButton } from '@ionic/vue';
import { arrowBack } from 'ionicons/icons';
</script>

<style scoped></style>