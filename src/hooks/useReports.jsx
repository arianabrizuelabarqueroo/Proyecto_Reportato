import { useState } from 'react';
import ReportService from '../services/ReportService';

const useReports = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  const generateDailyReport = async (ventas, estadisticas, filters = {}, sucursales = []) => {
    try {
      setIsGenerating(true);
      setError(null);

      const reportService = new ReportService();
      const processedFilters = {};

      if (filters.fecha) {
        processedFilters.fecha = new Date(filters.fecha).toLocaleDateString('es-ES');
      }

      if (filters.sucursal) {
        const sucursal = sucursales.find(s => s.id == filters.sucursal);
        processedFilters.sucursal = sucursal ? `${sucursal.nombre} (${sucursal.tipo})` : 'Sucursal seleccionada';
      }

      const doc = reportService.generateDailyReport(ventas, estadisticas, processedFilters);
      const filename = `reporte_ventas_diarias_${new Date().toISOString().split('T')[0]}.pdf`;
      reportService.downloadPDF(filename);
      return { success: true, filename };
    } catch (err) {
      console.error('Error al generar reporte:', err);
      setError('Error al generar el reporte PDF');
      return { success: false, error: err.message };
    } finally {
      setIsGenerating(false);
    }
  };

  const generateWeeklyReport = async (weeklyData, estadisticas, filters = {}, sucursales = []) => {
    try {
      setIsGenerating(true);
      setError(null);

      const reportService = new ReportService();
      const processedFilters = {};

      if (filters.fecha) {
        processedFilters.fecha = new Date(filters.fecha).toLocaleDateString('es-ES');
      }

      if (filters.sucursal) {
        const sucursal = sucursales.find(s => s.id == filters.sucursal);
        processedFilters.sucursal = sucursal ? `${sucursal.nombre} (${sucursal.tipo})` : 'Sucursal seleccionada';
      }

      const doc = reportService.generateWeeklyReport(weeklyData, estadisticas, processedFilters);
      const filename = `reporte_ventas_semanales_${new Date().toISOString().split('T')[0]}.pdf`;
      reportService.downloadPDF(filename);
      return { success: true, filename };
    } catch (err) {
      console.error('Error al generar reporte:', err);
      setError('Error al generar el reporte PDF');
      return { success: false, error: err.message };
    } finally {
      setIsGenerating(false);
    }
  };

  const generateWeeklyReportBySucursal = async (ventas) => {
    try {
      setIsGenerating(true);
      setError(null);

      const reportService = new ReportService();
      const doc = reportService.generateWeeklyReportBySucursal(ventas);
      const filename = `reporte_semanal_por_sucursal_${new Date().toISOString().split('T')[0]}.pdf`;
      reportService.downloadPDF(filename);
      return { success: true, filename };
    } catch (err) {
      console.error('Error al generar reporte por sucursal:', err);
      setError('Error al generar el reporte PDF por sucursal');
      return { success: false, error: err.message };
    } finally {
      setIsGenerating(false);
    }
  };

  const generateComparativeReport = async (ventas, estadisticas, filters = {}) => {
    try {
      setIsGenerating(true);
      setError(null);

      const reportService = new ReportService();
      const doc = reportService.generateDailyReport(ventas, estadisticas, filters);
      const filename = `reporte_comparativo_${new Date().toISOString().split('T')[0]}.pdf`;
      reportService.downloadPDF(filename);
      return { success: true, filename };
    } catch (err) {
      console.error('Error al generar reporte:', err);
      setError('Error al generar el reporte PDF');
      return { success: false, error: err.message };
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateDailyReport,
    generateWeeklyReport,
    generateWeeklyReportBySucursal,
    generateComparativeReport,
    isGenerating,
    error,
    clearError: () => setError(null)
  };
};

export default useReports;
