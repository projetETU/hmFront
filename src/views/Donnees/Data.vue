<template>
    <AdminLayout>
        <PageBreadcrumb :pageTitle="currentPageTitle" />

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-4">

            <div
                class="rounded-2xl border border-gray-200 bg-white p-2 dark:border-gray-800 dark:bg-white/[0.03] md:p-4">
                <div class="flex items-end justify-between">
                    <div class="w-full">
                        <span class="text-lg font-bold text-gray-500 dark:text-gray-400">Programme</span>
                        <Popover v-slot="{ close }">
                            <PopoverTrigger as-child>
                                <Button variant="outline"
                                    :class="cn('w-full h-11 mt-2 justify-start text-left font-normal', !date && 'text-muted-foreground')">
                                    <CalendarIcon />
                                    {{ date ? df.format(date.toDate(getLocalTimeZone())) : "Choisir une date" }}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent class="w-auto p-0" align="start">
                                <Calendar v-model="date" :default-placeholder="defaultPlaceholder"
                                    layout="month-and-year" initial-focus @update:model-value="close" />
                            </PopoverContent>
                        </Popover>
                        <Button @click="handleProgrammePdf"
                            class="mt-3 h-11 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 active:bg-blue-800">
                            <FileText></FileText>
                            PDF
                        </Button>
                    </div>
                </div>
            </div>

            <div
                class="rounded-2xl border border-gray-200 bg-white p-2 dark:border-gray-800 dark:bg-white/[0.03] md:p-4">
                <div class="flex items-end justify-between">

                    <div class="w-full">
                        <span class="text-lg font-bold text-gray-500 dark:text-gray-400">Exportez les details</span>
                        <div class="flex gap-2 mt-2">
                            <Popover v-slot="{ close }">
                                <PopoverTrigger as-child>
                                    <Button variant="outline"
                                        :class="cn('flex-1 h-11 justify-start text-left font-normal', !dateDebutF && 'text-muted-foreground')">
                                        <CalendarIcon />
                                        {{ dateDebutF ? df.format(dateDebutF.toDate(getLocalTimeZone())) : "Debut" }}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent class="w-auto p-0" align="start">
                                    <Calendar v-model="dateDebutF" :default-placeholder="defaultPlaceholder"
                                        layout="month-and-year" initial-focus @update:model-value="close" />
                                </PopoverContent>
                            </Popover>

                            <Popover v-slot="{ close }">
                                <PopoverTrigger as-child>
                                    <Button variant="outline"
                                        :class="cn('flex-1 h-11 justify-start text-left font-normal', !dateFinF && 'text-muted-foreground')">
                                        <CalendarIcon />
                                        {{ dateFinF ? df.format(dateFinF.toDate(getLocalTimeZone())) : "Fin" }}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent class="w-auto p-0" align="start">
                                    <Calendar v-model="dateFinF" :default-placeholder="defaultPlaceholder"
                                        layout="month-and-year" initial-focus @update:model-value="close" />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <Button @click="exportDetails"
                            class="mt-3 h-11 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 active:bg-blue-800">
                            <FileText></FileText>
                            Exportation
                        </Button>
                    </div>
                </div>
            </div>

            <div
                class="rounded-2xl border border-gray-200 bg-white p-2 dark:border-gray-800 dark:bg-white/[0.03] md:p-4">
                <div class="flex items-end justify-between">
                    <div class="w-full">
                        <span class="text-lg font-bold text-gray-500 dark:text-gray-400">Importez facture payer</span>
                        <div class="flex gap-2 mt-2">
                            <Input type="file" class="flex-1 h-11 justify-start text-left font-normal" />
                        </div>

                        <Button
                            class="mt-3 h-11 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 active:bg-blue-800">
                            <DownloadIcon></DownloadIcon>
                            Importation
                        </Button>
                    </div>
                </div>
            </div>



        </div>


        <div class=" mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-4">


            <div
                class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">


                <div>
                    <h4 class="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">Reccette du <span class="text-sm">(Ulys)</span></h4>
                </div>
                <div class="mt-5 space-y-2">
                    <div class="w-full">
                        <Popover v-slot="{ close }">
                            <PopoverTrigger as-child>
                                <Button variant="outline"
                                    :class="cn('w-full h-11 mt-2 justify-start text-left font-normal', !date && 'text-muted-foreground')">
                                    <CalendarIcon />
                                    {{ date ? df.format(date.toDate(getLocalTimeZone())) : "Choisir une date" }}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent class="w-auto p-0" align="start">
                                <Calendar v-model="date" :default-placeholder="defaultPlaceholder"
                                    layout="month-and-year" initial-focus @update:model-value="close" />
                            </PopoverContent>
                        </Popover>
                        <Button @click="handleProgrammePdf"
                            class="mt-3 h-11 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 active:bg-blue-800">
                            <FileText></FileText>
                            PDF
                        </Button>
                    </div>
                </div>


            </div>



        </div>




    </AdminLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch, type Ref } from "vue";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";

import type { DateValue } from '@internationalized/date'
import { DateFormatter, getLocalTimeZone, today } from '@internationalized/date'
import { CalendarIcon, FileText, DownloadIcon } from '@lucide/vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import api from "@/api/api";
import Input from "@/components/ui/input/Input.vue";

const defaultPlaceholder = today(getLocalTimeZone())

// Date pour le programme (initialisée à aujourd'hui)
const date = ref(today(getLocalTimeZone())) as Ref<DateValue>

const dateDebutF = ref() as Ref<DateValue>
const dateFinF = ref() as Ref<DateValue>

const df = new DateFormatter('fr', {
    dateStyle: 'long',
});

// =========================
// FORMATAGE DE DATE LOCALE (yyyy-MM-dd) SANS DECALAGE UTC
// =========================
const formatLocalDate = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// =========================
// EXPORT DETAILS (CSV)
// =========================
const exportDetails = async () => {
    if (!dateDebutF.value || !dateFinF.value) {
        console.error("Veuillez sélectionner une date de début et de fin");
        return;
    }

    const dateDebut = formatLocalDate(dateDebutF.value.toDate(getLocalTimeZone()));
    const dateFin = formatLocalDate(dateFinF.value.toDate(getLocalTimeZone()));

    try {
        const response = await api.get("api/commande/excel", {
            params: {
                dateDebut,
                dateFin
            },
            responseType: 'blob'
        })

        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv' }))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `commandes_${dateDebut}_${dateFin}.csv`)
        document.body.appendChild(link)
        link.click()
        link.remove()
        window.URL.revokeObjectURL(url)
    } catch (error) {
        console.error("Erreur lors de l'exportation des détails :", error);
    }
};


interface ProgrammeData {
    pointDeVente: string
    produit: string
    totalQte: number
}

const rawData = ref<ProgrammeData[]>([])

const fetchProgrammeData = async () => {
    if (!date.value) return;

    const formattedDate = formatLocalDate(date.value.toDate(getLocalTimeZone()));

    try {
        const response = await api.get(`/api/commande/programme`, {
            params: {
                date: formattedDate,
            },
        });
        rawData.value = response.data.data ?? response.data
    } catch (error) {
        console.error("Erreur lors de la récupération des données du programme :", error);
        rawData.value = [];
    }
};

const produits = computed(() =>
    Array.from(new Set(rawData.value.map((r) => r.produit)))
)

const pivotData = computed(() => {
    const map = new Map<string, Record<string, any>>()
    for (const row of rawData.value) {
        if (!map.has(row.pointDeVente)) {
            map.set(row.pointDeVente, { pointDeVente: row.pointDeVente })
        }
        map.get(row.pointDeVente)![row.produit] = row.totalQte
    }
    return Array.from(map.values())
})

// =========================
// GENERATION PDF PROGRAMME
// =========================
const programmePdf = (
    pivotDataParam: Record<string, any>[],
    produitsParam: string[],
    titre = "SAMBOS MASAKA",
    articleDetail?: string // nom de l'article à détailler dans le 2e tableau
) => {
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
    });

    if (!Array.isArray(pivotDataParam) || pivotDataParam.length === 0) {
        doc.setFontSize(12);
        doc.text("Pas de données", 20, 20);
        doc.output("dataurlnewwindow");
        return;
    }

    const totalRow: Record<string, any> = { pointDeVente: "" };
    for (const p of produitsParam) {
        totalRow[p] = pivotDataParam.reduce(
            (sum, row) => sum + Number(row[p] || 0),
            0
        );
    }

    const body = pivotDataParam.map((row) => [
        row.pointDeVente,
        ...produitsParam.map((p) => (row[p] ? row[p] : "-")),
    ]);

    body.push([
        "",
        ...produitsParam.map((p) => (totalRow[p] ? totalRow[p] : 0)),
    ]);

    const head = [
        [
            { content: "CLIENT", rowSpan: 2, styles: { valign: "middle" } },
            { content: titre, colSpan: produitsParam.length, styles: { halign: "center" } },
        ],
        [...produitsParam.map((p) => ({ content: p }))],
    ];

    // =========================
    // TABLEAU 1
    // =========================
    autoTable(doc, {
        startY: 15,
        head,
        body,
        theme: "grid",

        styles: {
            fontSize: 9,
            cellPadding: 2,
            lineWidth: 0.2,
            lineColor: [0, 0, 0],
            halign: "center",
            valign: "middle",
        },

        headStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0],
            fontStyle: "bold",
            lineWidth: 0.2,
            lineColor: [0, 0, 0],
        },

        bodyStyles: {
            textColor: [0, 0, 0],
        },

        columnStyles: {
            0: { halign: "left", cellWidth: 45, fontStyle: "bold" },
        },

        didParseCell: (data) => {
            if (data.row.index === body.length - 1 && data.section === "body") {
                data.cell.styles.fontStyle = "bold";
                data.cell.styles.fillColor = [240, 240, 240];
            }
        },
    });

    // =========================
    // TABLEAU 2 : DÉTAIL PAR ARTICLE
    // =========================
    if (articleDetail) {
        const finalY = (doc as any).lastAutoTable.finalY;

        doc.setFontSize(11);
        doc.setFont(undefined, "bold");

        const formatCartons = (valeur: number) => {
            const qte = Math.round(valeur); // arrondit la quantité brute UNE seule fois (utile si BigDecimal renvoie des décimales parasites)
            const cartons = Math.floor(qte / 24);
            const reste = qte % 24;
            return `${cartons}F +${reste}`;
        };

        const detailBody = pivotDataParam
            .filter((row) => row[articleDetail] !== undefined)
            .map((row) => [
                row.pointDeVente,
                row[articleDetail] ?? "-",
                row[articleDetail] ? formatCartons(row[articleDetail]) : "-"
            ]);

        const detailTotal = pivotDataParam.reduce(
            (sum, row) => sum + Number(row[articleDetail] || 0),
            0
        );
        detailBody.push([
            "TOTAL",
            detailTotal,
            detailTotal ? formatCartons(detailTotal) : "-"
        ]);

        autoTable(doc, {
            startY: finalY + 14,
            head: [["Client", articleDetail, ""]],
            body: detailBody,
            theme: "grid",

            styles: {
                fontSize: 9,
                cellPadding: 2,
                lineWidth: 0.2,
                lineColor: [0, 0, 0],
                halign: "center",
                valign: "middle",
            },

            headStyles: {
                fillColor: [255, 255, 255],
                textColor: [0, 0, 0],
                fontStyle: "bold",
                lineWidth: 0.2,
                lineColor: [0, 0, 0],
            },

            columnStyles: {
                0: { halign: "left", cellWidth: 60, fontStyle: "bold" },
            },

            didParseCell: (data) => {
                if (data.row.index === detailBody.length - 1 && data.section === "body") {
                    data.cell.styles.fontStyle = "bold";
                    data.cell.styles.fillColor = [240, 240, 240];
                }
            },
        });
    }
    doc.output("dataurlnewwindow");
};
function handleProgrammePdf() {
    programmePdf(pivotData.value, produits.value, "SAMBOS MASAKA", "MOFO");
}

// Recharge les données du programme à chaque changement de date
watch(date, fetchProgrammeData);

onMounted(fetchProgrammeData)

const currentPageTitle = ref("Mes données");
</script>